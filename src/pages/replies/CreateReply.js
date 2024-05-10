import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import styles from '../../styles/CreateComment.module.css'
import { axiosRes } from '../../api/axiosDefaults'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const CreateReply = (props) => {
    const {comment, setComment, setReply, profile_id, profile_image} = props;
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
    <div className={styles.container}>
        <p>reply section!</p>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>
                    <Link to={`/profiles/${profile_id}`}>
                    <img src={profile_image} alt='profile' className={styles.image}/>
                    </Link>
                    write a reply
                </Form.Label>
                <Form.Control 
                    type="textarea"
                    onChange={handleChange}
                    value={content} />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn d-block ml-auto">
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default CreateReply