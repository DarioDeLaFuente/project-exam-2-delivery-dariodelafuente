import styles from "./LoaderBox.module.css";
import { Container, Row, Col } from "react-bootstrap";

const LoaderBox = () => {
  return (
    <Container fluid className={styles.loaderContainer}>
      <Row className="justify-content-md-center align-items-center h-100">
        <Col md="auto">
          <div className={styles.banterLoader}>
            <div className={styles.banterLoader__box}></div>
            <div className={styles.banterLoader__box}></div>
            <div className={styles.banterLoader__box}></div>
            <div className={styles.banterLoader__box}></div>
            <div className={styles.banterLoader__box}></div>
            <div className={styles.banterLoader__box}></div>
            <div className={styles.banterLoader__box}></div>
            <div className={styles.banterLoader__box}></div>
            <div className={styles.banterLoader__box}></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoaderBox;
