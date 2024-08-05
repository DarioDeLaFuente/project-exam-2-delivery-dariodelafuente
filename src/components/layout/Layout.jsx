import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import FooterNav from "../footer/FooterNav";
import NavBar from "../nav/Navbar";

import ProfileCarousel from "../../components/profiles/ProfileCarousel";
import { isLoggedIn } from "../../utils/storage";

const Layout = () => {
  const loggedIn = isLoggedIn();

  return (
    <>
      <NavBar />
      {loggedIn && <ProfileCarousel />}
      <Container style={{ minHeight: "90vh" }}>
        <Outlet />
      </Container>
      <FooterNav />
    </>
  );
};

export default Layout;
