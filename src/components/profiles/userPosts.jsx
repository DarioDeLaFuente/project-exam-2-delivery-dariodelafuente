import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import deletePost from "../profiles/deletePost";
import deleteComment from "../posts/deleteComment";
import { getUser } from "../../utils/storage";

const UserPosts = ({ posts, onDeletePost, onDeleteComment, onEditPost }) => {
  const navigate = useNavigate();
  const loggedInUser = getUser();

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      onDeletePost(postId);
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await deleteComment(postId, commentId);
      onDeleteComment(postId, commentId);
    } catch (error) {
      if (error.message.includes("403")) {
        alert("You do not have permission to delete this comment.");
      } else {
        console.error("Failed to delete comment", error);
      }
    }
  };

  if (posts.length === 0) {
    return <p>No posts available</p>;
  }

  return (
    <>
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
              <Button
                variant="danger"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete Post
              </Button>
              <Button variant="primary" onClick={() => onEditPost(post)}>
                Edit Post
              </Button>
              <div>
                <h3>Comments</h3>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.id} style={{ marginBottom: "10px" }}>
                      <p>
                        <strong>{comment.author.name}:</strong> {comment.body}
                      </p>
                      {comment.author.name === loggedInUser.name ? (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleDeleteComment(post.id, comment.id)
                          }
                        >
                          Delete Comment
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate(`/posts/${post.id}`)}
                        >
                          Reply
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No comments available</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default UserPosts;
