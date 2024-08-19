import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiSupport } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <Card className="m-3">
      <Card.Header as="h5">Contact Us</Card.Header>
      <Card.Body>
        <Card.Title>YYZ Support </Card.Title>
        <Button variant="primary">
          {" "}
          <BiSupport /> 22 04 65 00
        </Button>
        <Button className="m-1" variant="primary">
          {" "}
          <MdAlternateEmail /> post@XYZ.no
        </Button>
        <Card.Text>Kristian Augusts gate 7 A0164 Oslo</Card.Text>
        <Card.Text>Org nr: 952 330 075</Card.Text>
        <Card.Img
          className={styles.imageContact}
          variant="bottom"
          src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?t=st=1723579995~exp=1723583595~hmac=7e212dd123ab47e72f27926ee85de968935be296381097da924a07871ceedd99&w=1060"
        />
      </Card.Body>
    </Card>
  );
};

export default Contact;
