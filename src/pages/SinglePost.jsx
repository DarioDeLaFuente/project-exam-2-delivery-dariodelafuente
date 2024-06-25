import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { POSTS_URL } from "../constants/apiUrl";
import axios from "axios";
import { getToken, getUser } from "../utils/storage";
import { Card, Container, Button } from "react-bootstrap";
import ReactionButtons from "../components/posts/ReactionButtons";
import CommentForm from "../components/posts/CommentForm";

const fetchPost = async (id) => {
  const accessToken = getToken();
  const response = await axios.get(
    `${POSTS_URL}/${id}?_author=true&_comments=true&_reactions=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

const SinglePost = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery(["post", id], () => fetchPost(id));
  const [reactions, setReactions] = useState([]);
  const [comments, setComments] = useState([]);
  const loggedInUser = getUser();

  useEffect(() => {
    if (post) {
      if (post.reactions) {
        setReactions(post.reactions);
      }
      if (post.comments) {
        setComments(post.comments);
      }
    }
  }, [post]);

  const mutation = useMutation(
    (symbol) => {
      const accessToken = getToken();
      return axios.put(
        `${POSTS_URL}/${id}/react/${symbol}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
    },
    {
      onSuccess: (data) => {
        updateReactions(data.data);
        queryClient.invalidateQueries(["post", id]);
      },
      onError: (error) => {
        console.error("Error updating reactions:", error);
      },
    },
  );

  const commentMutation = useMutation(
    (newComment) => {
      const accessToken = getToken();
      return axios.post(
        `${POSTS_URL}/${id}/comment`,
        { body: newComment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
    },
    {
      onSuccess: (data) => {
        updateComments(data.data);
        queryClient.invalidateQueries(["post", id]);
      },
      onError: (error) => {
        console.error("Error adding comment:", error);
      },
    },
  );

  const deleteCommentMutation = useMutation(
    (commentId) => {
      const accessToken = getToken();
      return axios.delete(`${POSTS_URL}/${id}/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: (data, variables) => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== variables),
        );
        queryClient.invalidateQueries(["post", id]);
      },
      onError: (error) => {
        console.error("Error deleting comment:", error);
      },
    },
  );

  const updateReactions = (newReaction) => {
    setReactions((prevReactions) => {
      const existingReaction = prevReactions.find(
        (r) => r.symbol === newReaction.symbol,
      );
      if (existingReaction) {
        return prevReactions.map((r) =>
          r.symbol === newReaction.symbol
            ? { ...r, count: newReaction.count }
            : r,
        );
      }
      return [...prevReactions, newReaction];
    });
  };

  const updateComments = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleReact = (symbol) => {
    mutation.mutate(symbol);
  };

  const handleComment = (comment) => {
    commentMutation.mutate(comment);
  };

  const handleDeleteComment = (commentId) => {
    deleteCommentMutation.mutate(commentId);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading post: {error.message}</p>;
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
          <Card.Text>
            Author:{" "}
            {post.author && (
              <Button
                variant="link"
                onClick={() => navigate(`/profile/${post.author.name}`)}
              >
                {post.author.name}
              </Button>
            )}
          </Card.Text>
          <Card.Text>Comments: {comments.length}</Card.Text>
          <div>
            {reactions.length > 0 ? (
              reactions.map((reaction) => (
                <ReactionButtons
                  key={reaction.symbol}
                  reaction={reaction}
                  onReact={handleReact}
                />
              ))
            ) : (
              <ReactionButtons
                reaction={{ symbol: "👍", count: 0 }}
                onReact={handleReact}
              />
            )}
          </div>
          <div>
            <h3>Comments</h3>
            {comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: "10px" }}>
                <p>
                  <strong>
                    {comment.author && (
                      <Button
                        variant="link"
                        onClick={() =>
                          navigate(`/profile/${comment.author.name}`)
                        }
                      >
                        {comment.author.name}
                      </Button>
                    )}
                  </strong>{" "}
                  {comment.body}
                </p>
                {comment.author.name === loggedInUser.name && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete Comment
                  </Button>
                )}
              </div>
            ))}
          </div>
          <CommentForm postId={id} onComment={handleComment} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SinglePost;
