import React,{useState, useEffect} from 'react'
import { axiosReq} from '../../api/axiosDefaults';
import { Container,Col,Row } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Story from '../stories/Story';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-result-found.avif'
import styles from '../../styles/ProfilePage.module.css'

const ProfilePage = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const {setProfileData, handleFollow, handleUnfollow}= useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profileStories, setProfileStories] = useState({results: []})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileStories }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/stories/?owner__profile=${id}`),
          
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileStories(profileStories);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  return (
    <Container>
        <Row>
            <Col xs={12} md={3}>
                <img src={profile?.image} alt='profile'/>
            </Col>
            <Col md={4} className={styles.info}>
                <h3>{profile?.owner}</h3>
                {currentUser &&
                !is_owner &&
                (profile?.following_id ? (
                <button className={styles.btn}
                    onClick={() => handleUnfollow(profile)}
                >
                    unfollow
                </button>
                ) : (
                <button className={styles.btn}
                    onClick={() => handleFollow(profile)}
                >
                    follow
                </button>
                ))}
                <Row>
                    <Col xs={4}>
                    <div>{profile?.story_count}</div>
                    <div>stories</div>
                    </Col>
                    <Col xs={4}>
                    <div>{profile?.followers_count}</div>
                    <div>followers</div>
                    </Col>
                    <Col xs={4}>
                    <div>{profile?.following_count}</div>
                    <div>following</div>
                    </Col>
                </Row>
            </Col>
            
        </Row>
        
        <Row>
            <Col xs={12} md={8}>
            <hr />
                <p>my stories</p>
            <hr />
                {hasLoaded? (
                <>
                {profileStories.results.length? profileStories.results.map((story) => (
                    <Story key={story.id} {...story} setStory={setProfileStories}/>
                )) : (
                    <Container>
                            <Asset src={NoResults}/>
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

export default ProfilePage