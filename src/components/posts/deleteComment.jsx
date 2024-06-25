import { getToken } from "../../utils/storage";
import { POSTS_URL } from "../../constants/apiUrl";

const deleteComment = async (postId, commentId) => {
  try {
    const accessToken = getToken();

    const response = await fetch(
      `${POSTS_URL}/${postId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete comment. Status: ${response.status}, Response: ${errorText}`,
      );
    }

    return response.status;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export default deleteComment;
