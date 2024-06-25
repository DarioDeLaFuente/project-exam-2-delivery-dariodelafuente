import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CommentForm = ({ postId, onComment }) => {
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onComment(comment);
    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CommentForm;
