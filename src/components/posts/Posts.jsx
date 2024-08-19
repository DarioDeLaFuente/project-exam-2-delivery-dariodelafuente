import { useState, useEffect } from "react";
import { POSTS_URL } from "../../constants/apiUrl";
import { getToken } from "../../utils/storage";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactionButtons from "../../components/posts/ReactionButtons";
import styles from "./Posts.module.css";
import PostPlaceholderImage from "./PostPlaceholderImage";
import Loader from "../../components/loader/Loader/";
import LoaderBox from "../../components/loader/LoaderBox/";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

        if (!response.data || response.data.length === 0) {
          throw new Error("No posts found");
        }

        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleReact = async (postId, symbol, e) => {
    e.stopPropagation();
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
                reactions: updateReactions(post.reactions, updatedReaction),
              }
            : post,
        ),
      );
    } catch (error) {
      console.error("Error updating reactions:", error);
    }
  };

  const updateReactions = (reactions, updatedReaction) => {
    const existingReaction = reactions.find(
      (reaction) => reaction.symbol === updatedReaction.symbol,
    );
    if (existingReaction) {
      return reactions.map((reaction) =>
        reaction.symbol === updatedReaction.symbol
          ? { ...reaction, count: updatedReaction.count }
          : reaction,
      );
    } else {
      return [...reactions, updatedReaction];
    }
  };

  if (loading) {
    return <LoaderBox />;
  }

  if (!getToken()) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  return (
    <Container>
      <div className={styles.gridcontainer}>
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`${styles.griditem} ${
              index === 0 || index === 9 ? styles.griditemlarge : ""
            }`}
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <Card className={styles.card}>
              {post.media ? (
                <Card.Img
                  className={styles.placeholder}
                  src={post.media}
                  alt="Post media"
                />
              ) : (
                <PostPlaceholderImage />
              )}

              <div className={styles.card__overlay}>
                <div className={styles.card__rating}>
                  <ReactionButtons
                    reaction={{
                      symbol: "👍",
                      count:
                        post.reactions.find((r) => r.symbol === "👍")?.count ||
                        0,
                    }}
                    onReact={(e) => handleReact(post.id, "👍", e)}
                  />
                  <ReactionButtons
                    reaction={{
                      symbol: "👎",
                      count:
                        post.reactions.find((r) => r.symbol === "👎")?.count ||
                        0,
                    }}
                    onReact={(e) => handleReact(post.id, "👎", e)}
                  />
                </div>
                <div>
                  <Card.Title className={styles.card__title}>
                    {post.title}
                  </Card.Title>
                  <Card.Text className={styles.card__subtitle}>
                    {post.body}
                  </Card.Text>
                  <Card.Text className={styles.card__subtitle}>
                    Comments: {post._count.comments}
                  </Card.Text>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Posts;
