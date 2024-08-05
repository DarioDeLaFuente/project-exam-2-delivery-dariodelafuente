import React from "react";
import { useQuery } from "react-query";
import { Carousel, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ALL_PROFILES_URL } from "../../constants/apiUrl";
import { getToken } from "../../utils/storage";
import PlaceholderImage from "../posts/PlaceholderImage";
import styles from "./ProfileCarousel.module.css";

const fetchProfiles = async () => {
  const accessToken = getToken();
  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const response = await axios.get(ALL_PROFILES_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const ProfileCarousel = () => {
  const navigate = useNavigate();
  const {
    data: profiles,
    isLoading,
    error,
  } = useQuery("profiles", fetchProfiles, {
    enabled: !!getToken(),
  });

  if (isLoading) return <p>Loading profiles...</p>;
  if (error) return <p>Error loading profiles: {error.message}</p>;
  if (!Array.isArray(profiles)) return <p>No profiles found.</p>;

  const chunkSize = 3;
  const profileChunks = [];
  for (let i = 0; i < profiles.length; i += chunkSize) {
    profileChunks.push(profiles.slice(i, i + chunkSize));
  }

  return (
    <Carousel className={styles.carousel}>
      {profileChunks.map((profileChunk, index) => (
        <Carousel.Item key={index}>
          <Row className="justify-content-center">
            {profileChunk.map((profile) => (
              <Col key={profile.name} xs={4} sm={3} md={2} className="mb-3">
                <Card
                  onClick={() => navigate(`/profile/${profile.name}`)}
                  className={styles.card}
                >
                  <Card.Body className={styles.cardBody}>
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="Profile avatar"
                        className={styles.cardImage}
                      />
                    ) : (
                      <PlaceholderImage className={styles.cardImage} />
                    )}
                    <Card.Text className={styles.cardText}>
                      {profile.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProfileCarousel;
