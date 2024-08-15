import React from "react";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import deletePost from "../profiles/deletePost";
import deleteComment from "../posts/deleteComment";
import { getUser } from "../../utils/storage";
import styles from "./userProfile.module.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import { LuView } from "react-icons/lu";
import { MdOutlineReplay } from "react-icons/md";

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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (posts.length === 0) {
    return <p>No posts available</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} className={`mb-3 ${styles.card}`}>
          <Row className="g-0">
            <Col md={4}>
              <Card.Img
                src={post.media}
                alt="Post media"
                className={styles.cardImg}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <LuView
                  cursor="pointer"
                  className="ms-2"
                  onClick={() => navigate(`/posts/${post.id}`)}
                />

                <FaRegTrashCan
                  cursor="pointer"
                  onClick={() => handleDeletePost(post.id)}
                  className="ms-2"
                />

                <TbEdit
                  cursor="pointer"
                  className="ms-2"
                  onClick={() => onEditPost(post)}
                />

                <div className="mt-3">
                  <h4>Comments</h4>
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                      <Accordion
                        defaultActiveKey="0"
                        key={comment.id}
                        className="mb-2"
                      >
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            {comment.author.name} commented:
                          </Accordion.Header>
                          <Accordion.Body>
                            {comment.body}
                            <br />
                            <small className="text-muted">
                              Created: {formatDate(comment.created)}
                            </small>
                            {comment.author.name === loggedInUser.name ? (
                              <FaRegTrashCan
                                cursor="pointer"
                                className="ms-2"
                                onClick={() =>
                                  handleDeleteComment(post.id, comment.id)
                                }
                              />
                            ) : (
                              <Button
                                onClick={() => navigate(`/posts/${post.id}`)}
                                className="ms-3"
                              >
                                Reply <MdOutlineReplay />
                              </Button>
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ))
                  ) : (
                    <p>No comments available</p>
                  )}
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default UserPosts;
