import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import Story from './Story'

const StoryPage = () => {
    const {id} = useParams();
    const [story, setStory] = useState({results:[]})

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: story }] = await Promise.all([
              axiosReq.get(`/stories/${id}`),
            ]);
            setStory({ results: [story] });
            console.log(story);
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [id]);
  return (
    <div>
        <Story {...story.results[0]} setStory={setStory} />
    </div>
  )
}

export default StoryPage