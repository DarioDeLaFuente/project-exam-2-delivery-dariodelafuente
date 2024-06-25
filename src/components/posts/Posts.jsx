import React, { useState, useEffect } from "react";
import { POSTS_URL } from "../../constants/apiUrl";
import { getToken } from "../../utils/storage";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactionButtons from "../../components/posts/ReactionButtons";
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
        const response = await axios.get(`${POSTS_URL}?_reactions=true`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleReact = async (postId, symbol) => {
    const accessToken = getToken();
    try {
      const response = await axios.put(
        `${POSTS_URL}/${postId}/react/${symbol}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      const updatedReaction = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                reactions: post.reactions.map((reaction) =>
                  reaction.symbol === updatedReaction.symbol
                    ? { ...reaction, count: updatedReaction.count }
                    : reaction,
                ),
              }
            : post,
        ),
      );
    } catch (error) {
      console.error("Error updating reactions:", error);
    }
  };

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
                <Card.Text>Comments: {post._count.comments}</Card.Text>
                <div>
                  {post.reactions && post.reactions.length > 0 ? (
                    post.reactions.map((reaction) => (
                      <ReactionButtons
                        key={reaction.symbol}
                        reaction={reaction}
                        onReact={(symbol) => handleReact(post.id, symbol)}
                      />
                    ))
                  ) : (
                    <Card.Text>No reactions</Card.Text>
                  )}
                </div>
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
