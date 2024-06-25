import { getToken } from "../../utils/storage";
import { PROFILE_URL } from "../../constants/apiUrl";

const FetchProfile = async (user) => {
  try {
    const accessToken = getToken();
    const response = await fetch(PROFILE_URL + user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch user profile data: ${errorText}`);
    }
    const profileData = await response.json();

    return profileData;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    throw error;
  }
};

export default FetchProfile;
