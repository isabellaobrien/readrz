import React, {useState, useEffect} from 'react'
import styles from '../../styles/Forms.module.css'
import {Form, Alert} from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'

const ProfileAboutMeEditForm = () => {
    const history = useHistory();
    const currentUser = useCurrentUser();
    const {id} = useParams();

    const [profileData, setProfileData] = useState({
        about_me: "",
    })

    const {about_me} = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
          if (currentUser?.profile_id?.toString() === id) {
            try {
              const { data } = await axiosReq.get(`/profiles/${id}/`);
              const { about_me } = data;
              setProfileData({ about_me });
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

      const handleChange = (event) => {
        setProfileData({
          ...profileData,
          [event.target.name]: event.target.value,
        })
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("about_me", about_me);
        
    
        try {
          await axiosReq.patch(`/profiles/${id}/`, formData);
          history.goBack();
        } catch (err) {
          console.log(err);
          setErrors(err.response?.data);
        }
      };
  return (
    <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
            <p className={styles.title}>edit your name</p>
            <Form.Group controlId="about_me" className={styles.input}>
                <Form.Label className="d-none">about_me</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="about me" 
                    name="about_me"
                    value={about_me}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.about_me?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

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

export default ProfileAboutMeEditForm