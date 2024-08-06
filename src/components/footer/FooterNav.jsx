import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "../../context/AuthContext";
//import { getUser, isLoggedIn } from "../../utils/storage";

import styles from "./FooterNav.module.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineCamera } from "react-icons/ai";

const FooterNav = () => {
  //const user = getUser();
 // const loggedIn = isLoggedIn();
 const { user, isLoggedIn } = useAuth();

  return (
    <Navbar className={styles.footerbar}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <AiOutlineCamera />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ml-auto ${styles.footer}`}>
            { user ? (
              <>
                <Nav.Link as={Link} to="/profile" className={styles.footerLink}>
                  <FaRegCircleUser />
                </Nav.Link>
                <div className="vr" />
                <Nav.Link as="div" className={styles.footerLink}></Nav.Link>
                <Nav.Link as={Link} to="/Contact" className={styles.footerLink}>
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to="/about" className={styles.footerLink}>
                  About Us
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/about" className={styles.footerLink}>
                  About Us
                </Nav.Link>
                <Nav.Link as={Link} to="/Contact" className={styles.footerLink}>
                  Contact
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FooterNav;
