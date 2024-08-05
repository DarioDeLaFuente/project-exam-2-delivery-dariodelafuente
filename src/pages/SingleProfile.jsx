import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { SINGLE_PROFILE_URL, PROFILE_POSTS_URL } from "../constants/apiUrl";
import { getToken, getUser } from "../utils/storage";
import { Image, Card, Row, Col, Button } from "react-bootstrap";
import FollowButton from "../components/profiles/FollowButton";
import PlaceholderImage from "../components/posts/PlaceholderImage";
import PlaceholderAvatarImage from "../components/placeholder/PlaceholderAvatarImage";
import styles from "../components/profiles/userProfile.module.css";

const fetchProfile = async (name) => {
  const accessToken = getToken();
  const response = await axios.get(
    `${SINGLE_PROFILE_URL(name)}?_followers=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

const fetchProfilePosts = async (name) => {
  const accessToken = getToken();
  const response = await axios.get(PROFILE_POSTS_URL(name), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const SingleProfile = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery(["profile", name], () => fetchProfile(name));
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery(["profilePosts", name], () => fetchProfilePosts(name));

  if (profileLoading || postsLoading) return <p>Loading profile...</p>;
  if (profileError) return <p>Error loading profile: {profileError.message}</p>;
  if (postsError) return <p>Error loading posts: {postsError.message}</p>;

  const loggedInUser = getUser();
  const isFollowing =
    profile?.followers?.some(
      (follower) => follower.name === loggedInUser.name,
    ) || false;

  const handleUpdate = () => {
    queryClient.invalidateQueries(["profile", name]);
  };

  return (
    <>
      <Card className={`mb-4 ${styles.profileCard}`}>
        {profile.banner ? (
          <Card.Img
            variant="top"
            className={styles.cardavatarbanner}
            src={profile.banner}
          />
        ) : (
          <PlaceholderImage />
        )}
        <Card.Body className="text-center">
          {profile.avatar ? (
            <Image
              className={styles.cardavatar_singel_profil}
              src={profile.avatar}
              roundedCircle
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <PlaceholderAvatarImage />
          )}
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>{profile.email}</Card.Text>
          <Card.Text>Posts: {profile._count.posts}</Card.Text>
          <Card.Text>Followers: {profile._count.followers}</Card.Text>
          <Card.Text>Following: {profile._count.following}</Card.Text>
          <FollowButton
            profileName={name}
            isFollowing={isFollowing}
            onUpdate={handleUpdate}
          />
        </Card.Body>
      </Card>
      <h2 className="mb-4">Posts by {profile.name}</h2>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Card>
              {post.media ? (
                <Card.Img
                  variant="top"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                  src={post.media}
                />
              ) : (
                <PlaceholderImage />
              )}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {post.body}
                </Card.Text>
                <Button onClick={() => navigate(`/posts/${post.id}`)}>
                  View Post
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SingleProfile;
