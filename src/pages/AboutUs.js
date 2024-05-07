import React from 'react'
import styles from '../styles/AboutUs.module.css'
import {Card} from 'react-bootstrap'


const AboutUs = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.logo}>READRZ.</h1>
        <div className={styles.text_box}>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Erat velit scelerisque in dictum non consectetur a erat nam.
            </p>
        </div>
        <div>
          <Card style={{ width: '18rem' }} className={styles.content}>
            <Card.Body>
              <Card.Title className={styles.title}>Card Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className={styles.content}>
            <Card.Body>
              <Card.Title className={styles.title}>Card Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className={styles.content}>
            <Card.Body>
              <Card.Title className={styles.title}>Card Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        
    </div>
  )
}

export default AboutUs