import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Comment.module.css'
const Comment = (props) => {
    const {
    id, 
    owner,
    profile_id,
    profile_image,
    content,
    updated_at,
    // comment_like_id,
    // comment_likes_count,
    // comment_reply_count,
    // setComment,
    } = props

    return (
    <div className={styles.container}>
        <Link to={`/profiles/${profile_id}`}>
            <img src={profile_image} className={styles.img} alt="profile"/>
            <p className={styles.owner}>{owner}</p>
        </Link>
        <p>{content}</p>
        <small className={styles.time}>{updated_at}</small>
    </div>
    )
}


export default Comment