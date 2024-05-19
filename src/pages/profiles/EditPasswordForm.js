import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Forms.module.css'
import {Form, Alert} from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults';

const EditPasswordForm = () => {
    const history = useHistory();
  const {id} = useParams();

  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  })
  const {new_password1, new_password2} = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    if(currentUser?.profile_id?.toString() !== id){
      history.push("/")
    }
  }, [currentUser, history, id])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await axiosRes.post("/dj-rest-auth/password/change/", userData)
      history.goBack()
    }catch(err){
      console.log(err);
      setErrors(err.response?.data);
    }
  }
  return (
    <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
            <p className={styles.title}>edit your password</p>
            <Form.Group controlId="new_password1" className={styles.input}>
                <Form.Label className="d-none">new password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="new password" 
                    name="new_password1"
                    value={new_password1}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.new_password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="new_password2" className={styles.input}>
                <Form.Label className="d-none">confirm new password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="confirm new password" 
                    name="new_password2"
                    value={new_password2}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.new_password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <button className={styles.btn} onClick={() => history.goBack()}>
                cancel
            </button>
            <button type="submit" className={styles.btn}>
                edit password
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

export default EditPasswordForm