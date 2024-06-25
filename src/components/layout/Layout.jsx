import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "../nav/Navbar";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <Container style={{ minHeight: "90vh" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
