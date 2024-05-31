import React from "react";
import Container from "react-bootstrap/Container";
import Posts from "../components/posts/Posts";

const Home = () => {
  return (
    <>
      <Container>
        <h1 className="header">Welcome</h1>
        <Posts />
      </Container>
    </>
  );
};

export default Home;
