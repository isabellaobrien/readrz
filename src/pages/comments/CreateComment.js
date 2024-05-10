import React, {useState} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {Form, Button} from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/CreateComment.module.css'

const CreateComment = (props) => {
    const {story, setStory, setComment, profile_image, profile_id} = props;
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
    <div className={styles.container}>
        <p>comment section!</p>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>
                    <Link to={`/profiles/${profile_id}`}>
                    <img src={profile_image} alt='profile' className={styles.image}/>
                    </Link>
                    write a comment
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

export default CreateComment