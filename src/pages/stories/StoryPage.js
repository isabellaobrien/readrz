import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import StoryDetail from './StoryDetail'
import CreateComment from '../comments/CreateComment'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import Comment from '../comments/Comment'

const StoryPage = () => {
    const {id} = useParams();
    const [story, setStory] = useState({results:[]})

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comment, setComment] = useState({results: []})

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: story }, {data: comment}] = await Promise.all([
              axiosReq.get(`/stories/${id}`),
              axiosReq.get(`/comments/?story=${id}`),
            ]);
            setStory({ results: [story] });
            setComment(comment)
            console.log(story);
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [id]);
  return (
    <div>
        <StoryDetail {...story.results[0]} setStory={setStory} />
        {currentUser? (
          <CreateComment
            profile_id={currentUser.profile_id}
            profile_image={profile_image}
            story={id}
            setStory={setStory}
            setComment={setComment}
          />) : null}
          {comment.results.length? (
            comment.results.map((comment) => (
              <Comment 
                key={comment.id} 
                {...comment}
                setStory={setStory}
                setComment={setComment}
              />
            ))
          ) : currentUser ? (
            <p>no comments yet, make one!</p>
          ) : (
            <p>no comments yet.</p>
          )}
    </div>
  )
}

export default StoryPage