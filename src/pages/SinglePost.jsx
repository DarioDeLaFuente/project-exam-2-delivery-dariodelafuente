import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { POSTS_URL } from "../constants/apiUrl";
import axios from "axios";
import { getToken } from "../utils/storage";
import { Card, Container } from "react-bootstrap";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const accessToken = getToken();
        const response = await axios.get(`${POSTS_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <Container>
      <Card>
        <Card.Img src={post.media} alt="Post media" />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SinglePost;
