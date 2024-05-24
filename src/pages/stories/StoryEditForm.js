import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/Forms.module.css'
import {Form, Alert,} from 'react-bootstrap'


const StoryEditForm = () => {
    const [StoryData, setStoryData] = useState({
        title: "",
        description: "",
        content: ""
    })

    const {title, description, content} = StoryData;

    const [errors, setErrors] = useState({})

    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try{
                const {data} = await axiosReq.get(`/stories/${id}/`);
                const {title, description, content, is_owner} = data;

                is_owner? setStoryData({title, description,content}) : history.push("/");
            }catch(err){
                console.log(err)
            }
        };

        handleMount();
    }, [history, id])

    const handleChange = (event) => {
        setStoryData({
            ...StoryData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("content", content);

        try {
          await axiosReq.put(`/stories/${id}/`, formData);
          history.push(`/stories/${id}`);
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            } 
        }
      };

  return (
    <div className={styles.container} title='editstory'>
        <Form onSubmit={handleSubmit}>
            <p className={styles.title}>edit your story</p>
            <Form.Group controlId="title" className={styles.input}>
                <Form.Label className="d-none">title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="title"
                    name="title"
                    value={title} 
                    onChange={handleChange}
                />

            </Form.Group>
            {errors.title?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="description" className={styles.input}>
                <Form.Label className="d-none">description</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="description" 
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.description?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="content" className={styles.input}>
                <Form.Label className="d-none">content</Form.Label>
                <Form.Control 
                    as='textarea'
                    type="text" 
                    placeholder="content" 
                    name="content"
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.content?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <button type="submit" className={styles.btn}>
                edit story
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

export default StoryEditForm