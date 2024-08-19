import PropTypes from "prop-types";
import styles from "./PlaceholderImage.module.css";

const PlaceholderImage = ({ className }) => {
  return <div className={`${styles.placeholder} ${className}`}></div>;
};

PlaceholderImage.propTypes = {
  className: PropTypes.string,
};

export default PlaceholderImage;
