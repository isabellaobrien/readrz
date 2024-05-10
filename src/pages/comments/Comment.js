import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Comment.module.css'
import {axiosRes} from '../../api/axiosDefaults'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const Comment = (props) => {
    const {
    id, 
    owner,
    profile_id,
    profile_image,
    content,
    updated_at,
    comment_like_id,
    comment_likes_count,
    comment_reply_count,
    setComment,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleCommentLike = async () => {
        try{
          const {data} = await axiosRes.post("/comment_likes/", {comment : id});
          setComment((prevComments) => ({
            ...prevComments,
            results: prevComments.results.map((comment) => {
              return comment.id === id ? 
              {...comment, comment_likes_count: comment_likes_count + 1, comment_like_id: data.id} :
              comment
            })
          }))
        }catch (err){
          console.log(err)
        }
  
      }
  
      const handleCommentUnlike = async () => {
        try {
          await axiosRes.delete(`/comment_likes/${comment_like_id}/`);
          setComment((prevComments) => ({
            ...prevComments,
            results: prevComments.results.map((comment) => {
              return comment.id === id
                ? { ...comment, comment_likes_count: comment_likes_count - 1, comment_like_id: null }
                : comment;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };

    return (
    <div className={styles.container}>
        <Link to={`/profiles/${profile_id}`}>
            <img src={profile_image} className={styles.img} alt="profile"/>
            <p className={styles.owner}>{owner}</p>
        </Link>
        <p>{content}</p>
        <small className={styles.time}>{updated_at}</small>
        <hr />
        {is_owner? (
            <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own story!</Tooltip>}>
            <i className="far fa-heart" />
            </OverlayTrigger>
        ) : comment_like_id ? (
            <span onClick={handleCommentUnlike}>
            <i class="fa-solid fa-heart"></i>
            </span>
        ) : currentUser ? (
            <span onClick={handleCommentLike}>
            <i class="fa-regular fa-heart"></i>
            </span>
        ) : (
            <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You need to log in to like stories</Tooltip>}>
            <i className="far fa-heart" />
            </OverlayTrigger>
        )}
        {comment_likes_count}
        <div className={styles.icon}>
            <i class="fa-solid fa-arrow-right"></i>
            {comment_reply_count}
        </div>
    </div>
    )
}


export default Comment