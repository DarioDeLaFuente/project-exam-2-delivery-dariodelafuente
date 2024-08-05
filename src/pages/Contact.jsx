import React from "react";

import Card from "react-bootstrap/Card";

const Contact = () => {
  return (
    <Card className="m-2">
      <Card.Body className="text-center">
        <Card.Title>Contact Us</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">YYZ</Card.Subtitle>
        <Card.Text>This is the Contact page.</Card.Text>
        <Card.Text>
          XYZ VERDENS NATURFOND Kristian Augusts gate 7 A0164 Oslo post@XYZ.no
          22 04 65 00 Org nr: 952 330 075
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Contact;
