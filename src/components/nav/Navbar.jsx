import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "../../context/AuthContext";
import Logout from "../logout/Logout";
import styles from "./Navbar.module.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineCamera } from "react-icons/ai";

const NavBar = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <AiOutlineCamera className={styles.navbarlogo} />
          XYZ
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ml-auto ${styles.nav}`}>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className={styles.navLink}>
                  <FaRegCircleUser className={styles.navbaravatar} />
                  <>{user.name}</>
                </Nav.Link>
                <div className="vr" />
                <Nav.Link as="div" className={styles.navLink}>
                  <Logout />
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className={styles.navLink}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className={styles.navLink}>
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
