import {React, useState} from 'react'
import styles from '../../styles/Forms.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import {Form, Alert} from 'react-bootstrap'

const CreateStory = () => {
    const [StoryData, setStoryData] = useState({
        title: "",
        description: "",
        content: ""
    })

    const {title, description, content} = StoryData;

    const [errors, setErrors] = useState({})

    const history = useHistory();

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
          const {data} = await axiosReq.post("/stories/", formData);
          history.push(`/stories/${data.id}`);
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            } 
        }
      };

  return (
    <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
            <p className={styles.title}>create a story</p>
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
                create story
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

export default CreateStory