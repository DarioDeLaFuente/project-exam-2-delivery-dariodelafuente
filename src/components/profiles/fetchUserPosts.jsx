import { getToken } from "../../utils/storage";
import { PROFILE_URL } from "../../constants/apiUrl";

const fetchUserPosts = async (userName) => {
  try {
    const accessToken = getToken();
    const response = await fetch(
      `${PROFILE_URL}${userName}/posts?_comments=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch user posts: ${errorText}`);
    }
    const postsData = await response.json();

    return postsData;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};

export default fetchUserPosts;
