import React, {useState, useEffect} from 'react'
import styles from '../../styles/Forms.module.css'
import {Form, Alert} from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'

const ProfileNameEditForm = () => {
    const history = useHistory();
    const currentUser = useCurrentUser();
    const {id} = useParams();

    const [profileData, setProfileData] = useState({
        name: "",
    })

    const {name} = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
          if (currentUser?.profile_id?.toString() === id) {
            try {
              const { data } = await axiosReq.get(`/profiles/${id}/`);
              const { name } = data;
              setProfileData({ name });
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
        formData.append("name", name);
        
    
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
            <Form.Group controlId="name" className={styles.input}>
                <Form.Label className="d-none">name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="name" 
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.name?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <button className={styles.btn} onClick={() => history.goBack()}>
                cancel
            </button>
            <button type="submit" className={styles.btn}>
                edit profile
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

export default ProfileNameEditForm