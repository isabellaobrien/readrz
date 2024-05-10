import React, {useState} from 'react'
import {axiosRes} from '../../api/axiosDefaults'
import {Form, Button} from 'react-bootstrap'
import styles from '../../styles/CreateComment.module.css'


const CommentEditForm = (props) => {
    const {id, content, setShowEditForm, setComments} = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim(),
            })
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id ? {
                        ...comment,
                        content: formContent.trim(),
                        updated_at: "now",
                    } : comment;
                })
            }))
            setShowEditForm(false)
        }catch(err) {
            console.log(err);
        }
    }

  return (
    <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Control 
                    as="textarea"
                    onChange={handleChange}
                    value={formContent} />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn d-block ml-auto">
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default CommentEditForm