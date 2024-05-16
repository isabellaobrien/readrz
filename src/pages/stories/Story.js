import React from 'react'
import {Card, OverlayTrigger, Tooltip} from 'react-bootstrap'
import styles from '../../styles/Story.module.css'
import {axiosRes} from '../../api/axiosDefaults'
import {useCurrentUser} from '../../contexts/CurrentUserContext'
import { Link } from "react-router-dom";

const Story = (props) => {
  const {
    id, 
    owner,
    title,
    description,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    updated_at,
    like_id,
    setStory
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;


  const handleLike = async () => {
    try{
      const {data} = await axiosRes.post("/likes/", {story : id});
      setStory((prevStories) => ({
        ...prevStories,
        results: prevStories.results.map((story) => {
          return story.id === id ? 
          {...story, likes_count: story.likes_count + 1, like_id: data.id} :
          story
        })
      }))
    }catch (err){
      console.log(err)
    }

  }

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setStory((prevStories) => ({
        ...prevStories,
        results: prevStories.results.map((story) => {
          return story.id === id
            ? { ...story, likes_count: story.likes_count - 1, like_id: null }
            : story;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className={styles.container}>
        <Card>
            <Card.Body>
                <Card.Title className={styles.profile}>
                  <Link to={`/profiles/${profile_id}`}>
                    <img src={profile_image} className={styles.img} alt="profile"/>
                    <p className={styles.owner}>{owner}</p>
                  </Link>
                </Card.Title>
                
                <hr />
                <Link to={`/stories/${id}`} className={styles.content}>
                  <Card.Text>
                    <h6 className={styles.title}>{title}</h6>
                  </Card.Text>
                  <Card.Text>
                  {description}
                  </Card.Text>
                </Link>
                {/* <Card.Text>
                {content}
                </Card.Text> */}
                <small className={styles.time}>{updated_at}</small>
                <hr />
                {is_owner? (
                  <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own story!</Tooltip>}>
                    <i className="far fa-heart" />
                  </OverlayTrigger>
                ) : like_id ? (
                  <span onClick={handleUnlike}>
                    <i class="fa-solid fa-heart"></i>
                  </span>
                ) : currentUser ? (
                  <span onClick={handleLike}>
                    <i class="fa-regular fa-heart"></i>
                  </span>
                ) : (
                  <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You need to log in to like stories</Tooltip>}>
                    <i className="far fa-heart" />
                  </OverlayTrigger>
                )}
                {likes_count}
                <div className={styles.icon}>
                  <i class="fa-regular fa-comment"></i>
                  {comments_count}
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Story