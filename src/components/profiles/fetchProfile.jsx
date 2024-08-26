import axios from "axios";
import { SINGLE_PROFILE_URL } from "../../constants/apiUrl";
import { getToken } from "../../utils/storage";

const fetchProfile = async (name) => {
  try {
    const token = getToken();
    const response = await axios.get(SINGLE_PROFILE_URL(name), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    throw new Error(`Failed to fetch user profile data: ${error}`);
  }
};

export default fetchProfile;
