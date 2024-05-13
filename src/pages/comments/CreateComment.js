import React, {useState} from 'react'
import {Form, Container, Row, Col} from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/CreateComment.module.css'

const CreateComment = (props) => {
    const {story, setStory, setComment} = props;
    const [content, setContent] = useState("");
    
    const handleChange = (event) => {
        setContent(event.target.value)
    }


    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const {data} = await axiosRes.post("/comments/", {
                content, 
                story,
            })
            setComment((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setStory((prevStory) => ({
                results: [
                    {
                        ...prevStory.results[0],
                        comments_count: prevStory.results[0].comments_count + 1,
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
                <div className={styles.container}>
                    <h2>Comment section</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="createCommentForm">
                            <Form.Control 
                                type="text"
                                as="textarea"
                                placeholder='comment on this story'
                                onChange={handleChange}
                                value={content} />
                        </Form.Group>
                        <button type="submit" className={styles.btn}>
                            comment
                        </button>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default CreateComment