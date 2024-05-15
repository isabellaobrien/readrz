import React,{useState} from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Comment.module.css'
import { axiosRes } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {Dropdown, OverlayTrigger, Tooltip} from 'react-bootstrap'
import ReplyEditForm from './ReplyEditForm'
const Reply = (props) => {
    const {
      id, 
      owner,
      profile_id,
      profile_image,
      content,
      updated_at,
      reply_like_id,
      reply_likes_count,
      setComment,
      setReply,
      } = props
  
      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;
  
      const [showReplyEditForm, setShowReplyEditForm] = useState(false);


      const handleDelete = async () => {
        try{
            await axiosRes.delete(`/replies/${id}`);
            setComment((prevComments) => ({
                results: [
                    {
                        ...prevComments.results[0],
                        comment_reply_count: prevComments.results[0].comment_reply_count - 1,
                    }
                ]
            }))

            setReply((prevReply) => ({
                ...prevReply,
                results: prevReply.results.filter((reply) => reply.id !== id)
            }))
        }catch (err){
            console.log(err)
        }
      }

        const handleReplyLike = async () => {
          try{
            const {data} = await axiosRes.post("/reply_likes/", {reply : id});
            setReply((prevReply) => ({
              ...prevReply,
              results: prevReply.results.map((reply) => {
                return reply.id === id ? 
                {...reply, reply_likes_count: reply_likes_count + 1, reply_like_id: data.id} :
                reply
              })
            }))
          }catch (err){
            console.log(err)
          }
    
        }
    
        const handleReplyUnlike = async () => {
          try {
            await axiosRes.delete(`/reply_likes/${reply_like_id}/`);
            setReply((prevReply) => ({
              ...prevReply,
              results: prevReply.results.map((reply) => {
                return reply.id === id
                  ? { ...reply, reply_likes_count: reply_likes_count - 1, reply_like_id: null }
                  : reply;
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
        <div className={styles.more}>
            {is_owner && !showReplyEditForm && (<Dropdown drop="up">
              <Dropdown.Toggle className={styles.dropdown} id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={() => setShowReplyEditForm(true)}>
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
          {showReplyEditForm? (
            <ReplyEditForm
              id={id} 
              profile_id={profile_id}
              content={content}
              profile_image={profile_image}
              setComment={setComment}
              setShowEditReplyForm={setShowReplyEditForm}
            />
          ) : (
            <p className={styles.content}>{content}</p>
          )}
        </div >
        <small className={styles.time}>{updated_at}</small>
        <br />
        <br />
        <div className={styles.icon}>
          {is_owner? (
              <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own reply!</Tooltip>}>
              <i className="far fa-heart" />
              </OverlayTrigger>
          ) : reply_like_id ? (
              <span onClick={handleReplyUnlike}>
              <i class="fa-solid fa-heart"></i>
              </span>
          ) : currentUser ? (
              <span onClick={handleReplyLike}>
              <i class="fa-regular fa-heart"></i>
              </span>
          ) : (
              <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You need to log in to like replies</Tooltip>}>
              <i className="far fa-heart" />
              </OverlayTrigger>
          )}
          {reply_likes_count}

        </div>
        
    </div>
  )
}

export default Reply