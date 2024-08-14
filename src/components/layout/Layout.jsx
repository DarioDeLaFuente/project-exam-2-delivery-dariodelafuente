import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import FooterNav from "../footer/FooterNav";
import NavBar from "../nav/Navbar";
import ProfileCarousel from "../../components/profiles/ProfileCarousel";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const { user } = useAuth();

  return (
    <>
      <NavBar />
      {user && <ProfileCarousel />}

      <Container style={{ minHeight: "90vh" }}>
        <Outlet />
      </Container>
      <FooterNav />
    </>
  );
};

export default Layout;
