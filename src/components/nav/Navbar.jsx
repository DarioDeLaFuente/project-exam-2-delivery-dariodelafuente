import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getUser, isLoggedIn } from "../../utils/storage";
import Logout from "../logout/Logout";

const NavBar = () => {
  const user = getUser();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          XYZ
        </Navbar.Brand>

        <Nav className="ml-auto">
          {isLoggedIn() ? (
            <Navbar.Text>
              <Nav.Link as={Link} to="/profile">
                Signed in as: {user.name}
              </Nav.Link>
              <Logout />
            </Navbar.Text>
          ) : (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
