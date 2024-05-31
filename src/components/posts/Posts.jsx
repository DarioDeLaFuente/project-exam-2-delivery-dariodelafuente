import React, { useState, useEffect } from "react";
import { POSTS_URL } from "../../constants/apiUrl";
import { getToken } from "../../utils/storage";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const accessToken = getToken();

      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const accessToken = getToken();
        const response = await axios.get(POSTS_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setPosts(response.data);
        console.log("POST LIST:", response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!getToken()) {
    return (
      <div>
        <p>Please log in to see the posts.</p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        {posts.map((post) => (
          <Col md={4} key={post.id} className="mb-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img src={post.media} alt="Post media" />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Button onClick={() => navigate(`/posts/${post.id}`)}>
                  View Post
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;
