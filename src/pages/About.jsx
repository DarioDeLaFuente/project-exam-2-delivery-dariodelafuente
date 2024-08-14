import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./About.module.css";

const About = () => {
  return (
    <Card className="m-3">
      <Card.Header as="h5">About Us</Card.Header>
      <Card.Body>
        <Card.Title>YYZ</Card.Title>
        <Card.Text>
          Our Story XYZ was founded with a simple idea: to create a space where
          everyone feels welcome to share their stories and ideas. Our team of
          passionate developers, designers, and community managers work
          tirelessly to bring you the best experience possible. Over the years,
          we have grown into a diverse community of individuals from all walks
          of life, each contributing their unique voice to our platform. We are
          proud of the community weve built together and excited for the future.
        </Card.Text>
      </Card.Body>
      <Card.Img
        className={styles.imageAbout}
        variant="Top"
        src="https://img.freepik.com/free-vector/group-concept-illustration_114360-8711.jpg?t=st=1723581315~exp=1723584915~hmac=ea7493b04da20ecb0020d857104607c275939f7b25d57df4c2caa8d6ed9fe015&w=1060"
      />
    </Card>
  );
};

export default About;
