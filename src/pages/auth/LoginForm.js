import React, {useState}from 'react'
import {Form, Alert} from "react-bootstrap"
import styles from '../../styles/Forms.module.css'
import { useHistory } from 'react-router-dom';
import axios from 'axios';




const LoginForm = () => {
    const [LoginData, setLoginData] = useState({
        username: "",
        password: "",
    })

    const {username, password} = LoginData;

    const [errors, setErrors] = useState({})

    const history = useHistory();

    const handleChange = (event) => {
        setLoginData({
            ...LoginData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post("/dj-rest-auth/login/", LoginData);
          history.push("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
      };

    
  return (
    <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
            <p className={styles.title}>sign up</p>
            <Form.Group controlId="username" className={styles.input}>
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="username"
                    name="username"
                    value={username} 
                    onChange={handleChange}
                />

            </Form.Group>
            {errors.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="password" className={styles.input}>
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="password" 
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.password?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <button type="submit" className={styles.btn}>
                log in
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

export default LoginForm