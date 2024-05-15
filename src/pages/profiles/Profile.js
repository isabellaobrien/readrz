import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'react-bootstrap';

const Profile = (props) => {
    const { profile, mobile} = props;
    const { id, following_id, image, owner } = profile;
  
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
  
    return (
      <div
        className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
      >
        <div>
          <Link className="align-self-center" to={`/profiles/${id}`}>
            <img src={image} alt='profile'/>
          </Link>
        </div>
        <div>
          <strong>{owner}</strong>
        </div>
        <div className={`text-right ${!mobile && "ml-auto"}`}>
          {!mobile &&
            currentUser &&
            !is_owner &&
            (following_id ? (
              <Button
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                onClick={() => {}}
              >
                follow
              </Button>
            ))}
        </div>
      </div>
    );
}

export default Profile