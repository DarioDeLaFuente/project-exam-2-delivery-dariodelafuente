import styles from "./Loader.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineCamera } from "react-icons/ai";

const Loader = () => {
  return (
    <Container fluid className={styles.loaderContainer}>
      <Row className="justify-content-md-center align-items-center h-100">
        <Col md="auto">
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.content__container}>
                <p className={styles.content__container__text}>
                  {" "}
                  <AiOutlineCamera />
                </p>
                <ul className={styles.content__container__list}>
                  <li className={styles.content__container__list__item}>
                    Holla users!
                  </li>
                  <li className={styles.content__container__list__item}>
                    yes u users!
                  </li>
                  <li className={styles.content__container__list__item}>
                    not me, but u!
                  </li>
                  <li className={styles.content__container__list__item}>
                    just log in!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
