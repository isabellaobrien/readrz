import React,{useState, useEffect} from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Comment.module.css'
import {axiosRes, axiosReq} from '../../api/axiosDefaults'
import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import CommentEditForm from './CommentEditForm';
import CreateReply from '../replies/CreateReply';
import Reply from '../replies/Reply'
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
    setStory
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const [showEditForm, setShowEditForm] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState({results: []})

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

      useEffect(() => {
      const handleMount = async () => {
        try {
          const [{ data: reply }] = await Promise.all([
            axiosReq.get(`/replies/?comment=${id}`),
          ]);
          setReply(reply)
          console.log(reply);
        } catch (err) {
          console.log(err);
        }
      };

      handleMount();
    }, [id]);

      const handleDelete = async () => {
        try{
            await axiosRes.delete(`/comments/${id}`);
            setStory((prevStory) => ({
                results: [
                    {
                        ...prevStory.results[0],
                        commments_count: prevStory.results[0].commments_count - 1,
                    }
                ]
            }))

            setComment((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id)
            }))
        }catch (err){
            console.log(err)
        }

        
    }

    return (
    <div className={styles.container}>
        <Link to={`/profiles/${profile_id}`}>
            <img src={profile_image} className={styles.img} alt="profile"/>
            <p className={styles.owner}>{owner}</p>
        </Link>
        <div className={styles.more}>
            {is_owner && !showEditForm && (<Dropdown drop="up">
              <Dropdown.Toggle className={styles.dropdown} id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={() => setShowEditForm(true)}>
                    edit <i class="fa-solid fa-pen-to-square"></i>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(handleDelete)}>
                    delete <i class="fa-solid fa-trash"></i>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>)}
        </div>
        <div>
          {showEditForm? (
            <CommentEditForm
              id={id} 
              profile_id={profile_id}
              content={content}
              profile_image={profile_image}
              setComments={setComment}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p className={styles.content}>{content}</p>
          )}
        </div >
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
        <div className={styles.icon} onClick={() => setShowReplyForm(true)}>
            <i class="fa-solid fa-arrow-right"></i>
            {comment_reply_count}
        </div>
        <hr />
        <small>{updated_at}</small>

        {currentUser && showReplyForm ? (
            <>
              <CreateReply
                profile_id={profile_id}
                profile_image={profile_image}
                comment={id}
                setComment={setComment}
                setReply={setReply}
              />
              {reply.results.length? (
                reply.results.map((rep) => (
                  <Reply 
                    key={rep.id} 
                    {...rep}
                    setComment={setComment}
                    setReply={setReply}
                  />
                ))
              ): null}
              <button onClick={() => setShowReplyForm(false)} className={styles.btn}>hide</button>
            </>
            ) : (
              null
            )}

    </div>
    )
}


export default Comment