import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { getToken } from "../../utils/storage";
import { Button } from "react-bootstrap";
import { SINGLE_PROFILE_URL } from "../../constants/apiUrl";

import { RiUserFollowFill } from "react-icons/ri";
import { RiUserUnfollowFill } from "react-icons/ri";

const followProfile = async (profileName) => {
  const accessToken = getToken();
  const response = await axios.put(
    `${SINGLE_PROFILE_URL(profileName)}/follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      },
    },
  );
  return response.data;
};

const unfollowProfile = async (profileName) => {
  const accessToken = getToken();
  const response = await axios.put(
    `${SINGLE_PROFILE_URL(profileName)}/unfollow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      },
    },
  );
  return response.data;
};

const FollowButton = ({
  profileName,
  isFollowing: initialIsFollowing,
  onUpdate,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowProfile(profileName);
        onUpdate("unfollow");
      } else {
        await followProfile(profileName);
        onUpdate("follow");
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following/unfollowing profile:", error);
    }
  };

  return (
    <Button variant={isFollowing ? "danger" : "primary"} onClick={handleFollow}>
      {isFollowing ? (
        <>
          Unfollow <RiUserUnfollowFill />
        </>
      ) : (
        <>
          Follow <RiUserFollowFill />
        </>
      )}
    </Button>
  );
};

FollowButton.propTypes = {
  profileName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default FollowButton;
