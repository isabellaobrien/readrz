import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Profile.module.css'
import { useSetProfileData } from '../../contexts/ProfileDataContext';

const Profile = (props) => {
    const { profile, mobile} = props;
    const { id, following_id, image, owner } = profile;
  
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const {handleFollow, handleUnfollow} = useSetProfileData()
  
    return (
      <div
        className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
      >
        <div>
          <Link className="align-self-center" to={`/profiles/${id}`}>
            <div className={styles.img_container}>
              <img src={image} alt='profile'/>
            </div>
            <p className={styles.owner}>{owner}</p>
          </Link>
        </div>
        <div className={`text-right ${!mobile && "ml-auto"}`}>
          {!mobile &&
            currentUser &&
            !is_owner &&
            (following_id ? (
              <button 
                className={styles.btn}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </button>
            ) : (
              <button
                className={styles.btn}
                onClick={() => handleFollow(profile)}
              >
                follow
              </button>
            ))}
        </div>
      </div>
    );
}

export default Profile