import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useQueryClient } from "react-query";
import { Form, Button, Modal } from "react-bootstrap";
import { getToken } from "../../utils/storage";
import { SINGLE_PROFILE_URL } from "../../constants/apiUrl";
import { FaUserEdit } from "react-icons/fa";

const updateProfileMedia = async (name, media) => {
  const accessToken = getToken();
  const response = await axios.put(`${SINGLE_PROFILE_URL(name)}/media`, media, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const UpdateProfileMedia = ({ user }) => {
  const [banner, setBanner] = useState(user.banner || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const media = { banner, avatar };
      await updateProfileMedia(user.name, media);
      queryClient.invalidateQueries(["userProfile", user.name]);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile media:", error);
      setError("Failed to update profile media");
    }
  };

  return (
    <>
      <div>
        <Button
          cursor="pointer"
          className="m-2"
          variant="primary"
          onClick={() => setShowModal(true)}
        >
          <FaUserEdit />
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBanner">
              <Form.Label>Banner URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter banner URL"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAvatar">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter avatar URL"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Form.Group>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

UpdateProfileMedia.propTypes = {
  user: PropTypes.shape({
    banner: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateProfileMedia;
