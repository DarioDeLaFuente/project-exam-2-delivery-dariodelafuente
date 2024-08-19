import PropTypes from "prop-types";
import PlaceholderImage from "../posts/PlaceholderImage";
import { Card, Row, Col } from "react-bootstrap";
import styles from "./userProfile.module.css";
import UpdateProfileMedia from "../../components/profiles/UpdateProfileMedia";
import LoaderBox from "../loader/LoaderBox";

const UserProfile = ({ user }) => {
  if (!user) {
    return <LoaderBox />;
  }

  return (
    <>
      <Card className={`mb-4 ${styles.profileCard}`}>
        {user.banner ? (
          <Card.Img
            className={styles.cardavatarbanner}
            src={user.banner}
            alt="Banner"
          />
        ) : (
          <PlaceholderImage />
        )}
        <Card.Body className={styles.cardBody}>
          {user.avatar ? (
            <Card.Img
              className={styles.cardavatar}
              src={user.avatar}
              alt="Avatar"
            />
          ) : (
            <PlaceholderImage />
          )}
          <Row>
            <Col>
              <Card.Text>Posts:{user._count.posts}</Card.Text>
              <Card.Text>Name: {user.name}</Card.Text>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Followers: {user._count.followers}</Card.Text>
              <Card.Text>Following: {user._count.following}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <UpdateProfileMedia user={user} />
      </Card>
    </>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    banner: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    _count: PropTypes.shape({
      posts: PropTypes.number,
      followers: PropTypes.number,
      following: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default UserProfile;
