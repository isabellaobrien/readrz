import React from 'react'
import styles from '../styles/AboutUs.module.css'
import {Card} from 'react-bootstrap'


const AboutUs = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.logo}>READRZ.</h1>
        <div className={styles.text_box}>
            <p>
            Readrz is a social media app where you can share your opinions,
            life stories, and your creativity in written form. 
            </p>
        </div>
        <div>
          <Card style={{ width: '18rem' }} className={styles.content}>
            <Card.Body>
              <Card.Title className={styles.title}>Community</Card.Title>
              <Card.Text>
                you can comment, like comments, reply to comments an even like replies, this 
                functionality allows you to interact with other users creating a sense of community
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className={styles.content}>
            <Card.Body>
              <Card.Title className={styles.title}>Guidelines</Card.Title>
              <Card.Text>
                you can write about anything you want as long as it is respectful and approriate.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className={styles.content}>
            <Card.Body>
              <Card.Title className={styles.title}>try it</Card.Title>
              <Card.Text>
                if you either like reading or writing readrz is for you.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        
    </div>
  )
}

export default AboutUs