import React, { useEffect, useState } from "react";
import FetchProfile from "../components/profiles/fetchProfile";
import UserProfile from "../components/profiles/userProfile";
import CreatePostForm from "../components/profiles/createPostForm";
import { getUser } from "../utils/storage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      setError("User data not found in local storage");
      setLoading(false);
      return;
    }

    const { name } = userData;
    const fetchData = async () => {
      try {
        const userData = await FetchProfile(name);
        setUser(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <UserProfile user={user} />
          <CreatePostForm />
        </>
      )}
    </div>
  );
};

export default Profile;
