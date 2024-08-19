import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { POSTS_URL } from "../constants/apiUrl";
import axios from "axios";
import { getToken, getUser } from "../utils/storage";
import { Card, Button, Image } from "react-bootstrap";
import ReactionButtons from "../components/posts/ReactionButtons";
import CommentForm from "../components/posts/CommentForm";
import PlaceholderImage from "../components/posts/PlaceholderImage";
import styles from "./SinglePost.module.css";
import { FaRegTrashCan } from "react-icons/fa6";
import LoaderBox from "../components/loader/LoaderBox";

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
        const sortedComments = post.comments.sort(
          (a, b) => new Date(a.created) - new Date(b.created),
        );
        setComments(sortedComments);
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
    setComments((prevComments) =>
      [...prevComments, newComment].sort(
        (a, b) => new Date(a.created) - new Date(b.created),
      ),
    );
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

  if (isLoading) {
    return <LoaderBox />;
  }

  if (error) {
    return <p>Error loading post: {error.message}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
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
          {post.media ? (
            <Card.Img src={post.media} alt="Post media" />
          ) : (
            <PlaceholderImage />
          )}

          <div className="mt-3">
            <ReactionButtons
              reaction={{
                symbol: "👍",
                count: reactions.find((r) => r.symbol === "👍")?.count || 0,
              }}
              onReact={() => handleReact("👍")}
            />
            <ReactionButtons
              reaction={{
                symbol: "👎",
                count: reactions.find((r) => r.symbol === "👎")?.count || 0,
              }}
              onReact={() => handleReact("👎")}
            />
          </div>
          <Card.Text className="mt-2">{post.body}</Card.Text>
          <Card.Text className="mt-2">{comments.length} Comments</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mt-3">
        <Card.Body>
          <CommentForm postId={id} onComment={handleComment} />
          <div className="mt-3">
            <h4>Comments</h4>
            {comments.map((comment) => (
              <div key={comment.id}>
                {comment.author && (
                  <Card className="mt-1">
                    <Card.Header>
                      <Image
                        src={comment.author.avatar}
                        variant="link"
                        className={styles.imagePost}
                        onClick={() =>
                          navigate(`/profile/${comment.author.name}`)
                        }
                        thumbnail
                      />
                      {comment.author.name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title> {comment.body}</Card.Title>
                      <Card.Text>{formatDate(comment.created)}</Card.Text>
                      {comment.author.name === loggedInUser.name && (
                        <FaRegTrashCan
                          cursor="pointer"
                          onClick={() => handleDeleteComment(comment.id)}
                        />
                      )}
                    </Card.Body>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SinglePost;
