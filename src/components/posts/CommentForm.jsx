//import React, { useState } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { GrSend } from "react-icons/gr";

//const CommentForm = ({ postId, onComment }) => {
const CommentForm = ({ onComment }) => {
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onComment(comment);
    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="comment">
        <Form.Label>Add a comment..</Form.Label>
        <Form.Control
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="mt-3" type="submit">
        Post
        <GrSend />
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  onComment: PropTypes.func.isRequired,
};

export default CommentForm;
