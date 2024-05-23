import React, {useState, useRef, useEffect} from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios'


function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);


  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedIn = (
    <>
      <Nav.Link href="/feed" className={styles.link}>feed</Nav.Link>
      <Nav.Link href="/liked" className={styles.link}>liked</Nav.Link>
      <Nav.Link href="/create-story" className={styles.link}>create story</Nav.Link>
      <Nav.Link to='/' onClick={handleSignOut} className={styles.link}>log out</Nav.Link>
      <Nav.Link href={`/profiles/${currentUser?.profile_id}`} className={styles.link}>
        <div>
          <i class="fa-solid fa-user"></i>
          <p className={styles.user}>{currentUser?.username}</p>
        </div>
      </Nav.Link>
    </>
  );
  const loggedOut = (
    <>
    <Nav.Link href='/about-us' className={styles.link}>about us</Nav.Link>
      <Nav.Link href='/login' className={styles.link}>log in</Nav.Link>
      <Nav.Link href='/signup' className={styles.link}>sign up</Nav.Link>
    </>
  )



  return (
    <>
        <Navbar expaded={expanded} expand="lg" className={styles.nav}>
            <Navbar.Brand href="/" className={styles.logo}>Readrz.</Navbar.Brand>
            <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                className="ml-auto"
                >
                <Nav.Link href="/" className={styles.link}>home</Nav.Link>
                {currentUser? loggedIn : loggedOut}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
  )
}

export default NavBar