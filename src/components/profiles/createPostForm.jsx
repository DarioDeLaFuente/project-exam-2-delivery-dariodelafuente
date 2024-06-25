import React, { useState } from "react";
import axios from "axios";
import { POSTS_URL } from "../../constants/apiUrl";
import { getToken } from "../../utils/storage";
import { Form, Button, Container } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";

const createPost = async (postData) => {
  const accessToken = getToken();
  const response = await axios.post(POSTS_URL, postData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState("");
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      setTitle("");
      setBody("");
      setTags("");
      setMedia("");
    },
    onError: (error) => {
      setError(
        "Failed to create post. Please check the media URL and try again.",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const postData = {
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()),
      media,
    };

    mutation.mutate(postData);
  };

  return (
    <Container>
      <h2>Create a New Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBody">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTags">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formMedia">
          <Form.Label>Media URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter media URL"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Container>
  );
};

export default CreatePostForm;
