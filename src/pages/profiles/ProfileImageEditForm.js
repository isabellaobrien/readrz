import React, {useState, useEffect, useRef} from 'react'
import styles from '../../styles/Forms.module.css'
import {Alert, Form,} from 'react-bootstrap'
import { axiosReq} from '../../api/axiosDefaults'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext'

const ProfileImageEditForm = () => {
    const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    image: "",
  });
  const { image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const {image } = data;
          setProfileData({ image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.patch(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };
  return (
    <div className={styles.container} title='editimage'>
        <Form onSubmit={handleSubmit}>
            <p className={styles.title}>edit your profile</p>
            <Form.Group>
                {image && (
                    <figure>
                        <img src={image}  alt='previous profile'className={styles.img}/>
                    </figure>
                    )}
                    {errors?.image?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                    ))}
                    <div>
                    <Form.Label
                        htmlFor="image-upload"
                    >
                        Change the image
                    </Form.Label>
                    </div>
                <Form.File 
                    id="image-upload" 
                    accept="image/*" 
                    ref={imageFile}
                    onChange={(e) => {
                        if (e.target.files.length) {
                          setProfileData({
                            ...profileData,
                            image: URL.createObjectURL(e.target.files[0]),
                          });
                        }
                      }}
                />
            </Form.Group>

            <button className={styles.btn} onClick={() => history.goBack()}>
                cancel
            </button>
            <button type="submit" className={styles.btn}>
                edit 
            </button>
            {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
        </Form>
    </div>
  )
}

export default ProfileImageEditForm