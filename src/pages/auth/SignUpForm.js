import React, {useState} from 'react'
import {Form, Alert} from 'react-bootstrap'
import styles from "../../styles/Forms.module.css"
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SignUpForm = () => {
    useRedirect('loggedIn')
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    })

    const {username, password1, password2} = signUpData;

    const [errors, setErrors] = useState({})

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/login");
        }catch (err){
            setErrors(err.response?.data);
        }
    }
  return (
    <div className={styles.container} title="signupform">
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

            <Form.Group controlId="password1" className={styles.input}>
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="password" 
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="password2" className={styles.input}>
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="confirm password" 
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <button type="submit" className={styles.btn}>
                sign up
            </button>
            {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <div className={styles.click_container}>
                <Link to="/login" className={styles.click}>
                Already have an account? Login!
                </Link>
            </div>
        </Form>
    </div>
  )
}

export default SignUpForm