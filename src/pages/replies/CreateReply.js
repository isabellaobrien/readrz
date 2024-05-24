import React,{useState} from 'react'
import {Form, Container, Row, Col} from 'react-bootstrap'
import styles from '../../styles/CreateComment.module.css'
import { axiosRes } from '../../api/axiosDefaults'

const CreateReply = (props) => {
    const {comment, setComment, setReply} = props;
    const [content, setContent] = useState("");
    
    const handleChange = (event) => {
        setContent(event.target.value)
    }


    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const {data} = await axiosRes.post("/replies/", {
                content, 
                comment,
            })
            setReply((prevReplies) => ({
                ...prevReplies,
                results: [data, ...prevReplies.results],
            }));
            setComment((prevComments) => ({
                results: [
                    {
                        ...prevComments.results[0],
                        comment_reply_count: prevComments.results[0].comment_reply_count + 1,
                    },
                ],
            }))
            setContent("");
        }catch (err){
            console.log(err)
        }
    }

  return (
    <Container>
        <Row>
            <Col xs={12} md={{ span: 8, offset: 2 }}>
                <div className={styles.container} title="createreply">
                    <p className={styles.replies}>REPLIES</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="CreateReplyForm">
                            <Form.Control 
                                type="text"
                                as='textarea'
                                onChange={handleChange}
                                value={content} />
                        </Form.Group>
                        <button type='submit' className={styles.btn}>
                            reply
                        </button>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default CreateReply