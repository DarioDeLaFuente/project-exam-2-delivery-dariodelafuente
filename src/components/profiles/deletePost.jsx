import { getToken } from "../../utils/storage";
import { POSTS_URL } from "../../constants/apiUrl";

const DeletePost = async (postId) => {
  try {
    const accessToken = getToken();
    const response = await fetch(`${POSTS_URL}/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    return response.status;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export default DeletePost;
