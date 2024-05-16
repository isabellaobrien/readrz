import React from 'react'
import {Card, OverlayTrigger, Tooltip, Dropdown, Container, Row, Col} from 'react-bootstrap'
import styles from '../../styles/StoryDetail.module.css'
import {axiosRes} from '../../api/axiosDefaults'
import {useCurrentUser} from '../../contexts/CurrentUserContext'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const StoryDetail = (props) => {
  const {
    id, 
    owner,
    title,
    content,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    updated_at,
    like_id,
    save_id,
    save_count,
    setStory
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/stories/${id}/edit`);
  };

  const handleDelete = async () => {
    try{
      await axiosRes.delete(`stories/${id}/`);
      history.push("/");
    }catch (err){
      console.log(err)
    }
  }

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
  const handleSave = async() => {
    try{
      const {data} = await axiosRes.post("/saves/", {story : id});
      setStory((prevStories) => ({
        ...prevStories,
        results: prevStories.results.map((story) => {
          return story.id === id ? 
          {...story, save_count: story.save_count + 1, save_id: data.id} :
          story
        })
      }))
    }catch (err){
      console.log(err)
    }

  }

  const handleUnsave = async() => {
    try{
      await axiosRes.delete(`/saves/${save_id}/`);
      setStory((prevStories) => ({
        ...prevStories,
        results: prevStories.results.map((story) => {
          return story.id === id
            ? { ...story, save_count: story.save_count - 1, save_id: null }
            : story;
        }),
      }));
    }catch (err){
      console.log(err)
    }

  }


  return (
    <Container>
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }}>
            <div className={styles.container}>
              <Card className={styles.card}>
                  <Card.Body>
                      <Card.Title className={styles.profile}>
                        <Link to={`/profiles/${profile_id}`}>
                          <img src={profile_image} className={styles.img} alt="profile"/>
                          <p className={styles.owner}>{owner}</p>
                        </Link>
                        <div className={styles.more}>
                          {is_owner && (
                            <Dropdown drop="up">
                              <Dropdown.Toggle className={styles.dropdown} id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item 
                                    onClick={handleEdit}>
                                    edit <i class="fa-solid fa-pen-to-square"></i>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={handleDelete}>
                                    delete <i class="fa-solid fa-trash"></i>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              )}
                        </div>
                      </Card.Title>
                      <hr />
                      <Card.Text>
                        <h4 className={styles.title}>{title}</h4>
                      </Card.Text>
                      <Card.Text>
                      {content}
                      </Card.Text>
                      <small className={styles.time}>{updated_at}</small>
                      <hr />
                      <div className={styles.icon}>
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
                      </div>
                      <div className={styles.icon}>
                        <i class="fa-regular fa-comment"></i>
                        {comments_count}
                      </div>
                      <div className={styles.icon}>
                        {is_owner? (
                          <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>No need to save your owne story, all your stories can be found in the profile page</Tooltip>}>
                            <i class="fa-regular fa-bookmark"></i>
                          </OverlayTrigger>
                        ) : save_id ? (
                          <span onClick={handleUnsave}>
                            <i class="fa-solid fa-bookmark"></i>
                          </span>
                        ) : currentUser ? (
                          <span onClick={handleSave}>
                            <i class="fa-regular fa-bookmark"></i>
                          </span>
                        ) : (
                          <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>You need to log in to save stories</Tooltip>}>
                            <i class="fa-regular fa-bookmark"></i>
                          </OverlayTrigger>
                        )}
                        {save_count}
                      </div>
                      
                  </Card.Body>
              </Card>
            </div>
        </Col>
      </Row>
    </Container>
  )
}

export default StoryDetail