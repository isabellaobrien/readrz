import React from 'react'
import {Card, Button} from 'react-bootstrap'
import styles from '../../styles/Story.module.css'

const Story = (props) => {
  const {
    // id, 
    owner,
    title,
    // description,
    content,
    // profile_id,
    profile_image,
    // comment_count,
    // likes_count,
    updated_at,
  } = props
  return (
    <div className={styles.container}>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title className={styles.profile}>
                  <img src={profile_image} className={styles.img}/>
                  <p className={styles.owner}>{owner}</p>
                </Card.Title>
                <Card.Text>
                  <h6 className={styles.title}>{title}</h6>
                </Card.Text>
                <Card.Text>
                {content}
                </Card.Text>
                <p className={styles.time}>{updated_at}</p>
                <hr />
            </Card.Body>
        </Card>
    </div>
  )
}

export default Story