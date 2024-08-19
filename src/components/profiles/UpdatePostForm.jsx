import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { POSTS_URL } from "../../constants/apiUrl";
import { getToken } from "../../utils/storage";
import { Form, Button } from "react-bootstrap";

const UpdatePostForm = ({ post, onUpdate }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [media, setMedia] = useState(post.media);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const accessToken = getToken();
    try {
      const response = await axios.put(
        `${POSTS_URL}/${post.id}`,
        {
          title,
          body,
          tags: tags.split(",").map((tag) => tag.trim()),
          media,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      onUpdate(response.data);
    } catch (error) {
      setError("Failed to update post");
    }
  };

  return (
    <Form onSubmit={handleUpdate}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBody">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formTags">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formMedia">
        <Form.Label>Media URL</Form.Label>
        <Form.Control
          type="text"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="primary" type="submit">
        Update Post
      </Button>
    </Form>
  );
};

UpdatePostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    media: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdatePostForm;
