import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/Comment.module.css'
const ReplyEditForm = (props) => {
    const {id, content, setShowReplyEditForm, setReply} = props;
    const [formContent, setFormContent] = useState(content);
    

    const handleChange = (event) => {
        setFormContent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
            try{
                await axiosRes.put(`/replies/${id}/`, {
                    content: formContent.trim(),
                })
                setReply((prevReply) => ({
                    ...prevReply,
                    results: prevReply.results.map((reply) => {
                        return reply.id === id ? {
                            ...reply,
                            content: formContent.trim(),
                            updated_at: "now",
                        } : reply;
                    })
                }))
                setShowReplyEditForm(false)
        }catch (err){
            console.log(err)
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

export default ReplyEditForm