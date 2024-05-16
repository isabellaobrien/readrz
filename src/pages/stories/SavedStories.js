import React, {useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Story from './Story';
import { axiosReq } from '../../api/axiosDefaults';
import { Container, Row, Col } from 'react-bootstrap';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-result-found.avif'

const SavedStories = ({ message, filter = "" }) => {
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
        <Col>
          {hasLoaded? (
              <>
              {story.results.length? story.results.map((story) => (
                  <Story key={story.id} {...story} setStory={setStory}/>
              )) : (
                  <Container>
                          <Asset message={message} />
                  </Container>
              )}
              </>) : (
                  <Container>
                      <Asset spinner />
                  </Container>
              )}
        </Col>

      </Row>
    </Container>
  )
}

export default SavedStories