import React from "react";
import Container from "react-bootstrap/Container";
import Posts from "../components/posts/Posts";
import ProfileCarousel from "../components/profiles/ProfileCarousel";

const Home = () => {
  return (
    <>
      <Container>
        <h1 className="header">Welcome</h1>
        <ProfileCarousel />
        <Posts />
      </Container>
    </>
  );
};

export default Home;
