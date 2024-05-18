import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Dropdown } from 'react-bootstrap';
import styles from '../../styles/Comment.module.css'

const ProfileEditDropdown = (props) => {
    const {id} = props;
    const history = useHistory();
  return (
    <Dropdown drop="up">
        <Dropdown.Toggle className={styles.dropdown}>
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/image`)}
                aria-label="edit-profile">
                edit profile picture
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/name`)}
                aria-label="edit-name">
                edit name
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/about-me`)}
                aria-label="about-me">
                edit about me
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/username`)}
                aria-label="edit-username">
                edit username
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/password`)}
                aria-label="edit-password">
                change password
            </Dropdown.Item>

        </Dropdown.Menu>
    </Dropdown>
  )
}

export default ProfileEditDropdown