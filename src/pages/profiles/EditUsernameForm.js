import React, {useState, useEffect} from 'react'
import styles from '../../styles/Forms.module.css'
import { axiosRes } from '../../api/axiosDefaults'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext'
import {Form, Alert} from 'react-bootstrap'
const EditUsernameForm = () => {
    const history = useHistory();
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState({})
  const {id} = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if(currentUser?.profile_id?.toString() === id){
        setUsername(currentUser.username)
    }else{
        history.push("/")
    }
  }, [currentUser, history, id])

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        await axiosRes.put("/dj-rest-auth/user/", {
            username,
        })
        setCurrentUser((prevUser) => ({
            ...prevUser,
            username,
        }));
        history.goBack();
    }catch(err){
        console.log(err);
        setErrors(err.response?.data);
    }
  }

  return (
    <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
            <p className={styles.title}>edit your username</p>
            <Form.Group controlId="username" className={styles.input}>
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="username" 
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
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

export default EditUsernameForm