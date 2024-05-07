import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import styles from "../styles/NavBar.module.css";
import { useCurrentUser } from '../contexts/CurrentUserContext';

function NavBar() {
  const currentUser = useCurrentUser();

  const loggedIn = (
    <>
      <Nav.Link href="#" className={styles.link}>feed</Nav.Link>
      <Nav.Link href="#" className={styles.link}>liked</Nav.Link>
      {currentUser?.username}
    </>
  );
  const loggedOut = (
    <>
      <Nav.Link href="#" className={styles.link}>log in</Nav.Link>
      <Nav.Link href="#" className={styles.link}>sign up</Nav.Link>
    </>
  )


  return (
    <>
        <Navbar expand="lg" className={styles.nav}>
            <Navbar.Brand href="#" className={styles.logo}>Readrz.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                className="ml-auto"
                >
                <Nav.Link href="#" className={styles.link}>home</Nav.Link>
                {currentUser? loggedIn : loggedOut}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
  )
}

export default NavBar