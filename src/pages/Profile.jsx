import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import FetchProfile from "../components/profiles/fetchProfile";
import FetchUserPosts from "../components/profiles/fetchUserPosts";
import UserProfile from "../components/profiles/userProfile";
import UserPosts from "../components/profiles/userPosts";
import CreatePostForm from "../components/profiles/createPostForm";
import UpdatePostForm from "../components/profiles/UpdatePostForm";

import { getUser } from "../utils/storage";
import { Row, Modal, Container } from "react-bootstrap";

const fetchUserProfile = async (name) => {
  return await FetchProfile(name);
};

const Profile = () => {
  const userData = getUser();
  const { name } = userData || {};
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery(["userProfile", name], () => fetchUserProfile(name), {
    enabled: !!name,
  });

  const {
    data: userPosts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery(["userPosts", name], () => FetchUserPosts(name), {
    enabled: !!name,
    onSuccess: (data) => setPosts(data),
  });

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    queryClient.invalidateQueries(["userPosts", name]);
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId,
            ),
          };
        }
        return post;
      }),
    );
    queryClient.invalidateQueries(["userPosts", name]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post,
      ),
    );
    setShowUpdateModal(false);
    queryClient.invalidateQueries(["userPosts", name]);
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setShowUpdateModal(true);
  };

  if (userLoading || postsLoading) {
    return <p>Loading...xxxx</p>;
  }

  if (userError) {
    return <p>Error loading user profile: {userError.message}</p>;
  }

  if (postsError) {
    return <p>Error loading user posts: {postsError.message}</p>;
  }

  return (
    <>
      {user ? (
        <Container>
          <UserProfile user={user} />
          <CreatePostForm userName={name} />
          <h2>User Posts</h2>
          <Row className="g-0">
            <UserPosts
              posts={posts}
              onDeletePost={handleDeletePost}
              onDeleteComment={handleDeleteComment}
              onEditPost={handleEditClick}
            />
          </Row>
          <Modal
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedPost && (
                <UpdatePostForm
                  post={selectedPost}
                  onUpdate={handleUpdatePost}
                />
              )}
            </Modal.Body>
          </Modal>
        </Container>
      ) : (
        <p>User data not found in local storage</p>
      )}
    </>
  );
};

export default Profile;
