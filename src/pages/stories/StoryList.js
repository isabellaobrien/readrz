import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Story from './Story';
import { axiosReq } from '../../api/axiosDefaults';
import { Container, Row, Col } from 'react-bootstrap';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-result-found.avif'
import styles from '../../styles/StoryList.module.css'
import PopularProfiles from '../profiles/PopularProfiles';

const StoryList = ({ message, filter = "" }) => {
    const [story, setStory] = useState({results:[]})
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchStories = async () => {
          try {
            const { data } = await axiosReq.get(`/stories/?${filter}`);
            setStory(data);
            setHasLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };
  
        setHasLoaded(false);
        fetchStories();
      }, [filter, pathname]);
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
        <PopularProfiles mobile />
          {hasLoaded? (
              <>
              {story.results.length? story.results.map((story) => (
                  <Story key={story.id} {...story} setStory={setStory}/>
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
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  )
}

export default StoryList