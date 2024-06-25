import React from "react";
import { useQuery } from "react-query";
import { Carousel, Card, Image, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ALL_PROFILES_URL } from "../../constants/apiUrl";
import { getToken } from "../../utils/storage";

const fetchProfiles = async () => {
  const accessToken = getToken();
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
  } = useQuery("profiles", fetchProfiles);

  if (isLoading) return <p>Loading profiles...</p>;
  if (error) return <p>Error loading profiles: {error.message}</p>;

  if (!Array.isArray(profiles)) {
    return <p>No profiles available</p>;
  }

  const chunkSize = 6;
  const profileChunks = [];
  for (let i = 0; i < profiles.length; i += chunkSize) {
    profileChunks.push(profiles.slice(i, i + chunkSize));
  }

  return (
    <Carousel style={{ margin: "2px 0", width: "110   50px" }}>
      {profileChunks.map((profileChunk, index) => (
        <Carousel.Item key={index}>
          <Row>
            {profileChunk.map((profile) => (
              <Col key={profile.name} md={2}>
                <Card
                  onClick={() => navigate(`/profile/${profile.name}`)}
                  style={{
                    cursor: "pointer",
                    margin: "2px 0",
                    width: "150px",
                    textAlign: "center",
                  }}
                >
                  <Card.Body>
                    <Image
                      src={profile.avatar}
                      roundedCircle
                      style={{
                        width: "80px",
                        height: "80px",
                        marginBottom: "10px",
                      }}
                    />
                    <Card.Text
                      style={{ fontSize: "10px" }}
                      className="mb-2 text-muted text-center"
                    >
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
