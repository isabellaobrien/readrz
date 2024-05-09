import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Story from './Story';
import { axiosReq } from '../../api/axiosDefaults';
import { Container } from 'react-bootstrap';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-result-found.avif'
import styles from '../../styles/StoryList.module.css'

const StoryList = ({ message, filter = "" }) => {
    const [stories, setStories] = useState({results:[]})
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchStories = async () => {
          try {
            const { data } = await axiosReq.get(`/stories/?${filter}`);
            setStories(data);
            setHasLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };
  
        setHasLoaded(false);
        fetchStories();
      }, [filter, pathname]);
  return (
    <div >
        <Container className={styles.story}>
            {hasLoaded? (
            <>
            {stories.results.length? stories.results.map((story) => (
                <Story key={story.id} {...story} setStories={setStories}/>
            )) : (
                <Container>
                        <Asset src={NoResults} message={message} />
                </Container>
            )}
            </>) : (
                <Container>
                    <Asset spinner />
                </Container>
            )}

        </Container>
    </div>
  )
}

export default StoryList