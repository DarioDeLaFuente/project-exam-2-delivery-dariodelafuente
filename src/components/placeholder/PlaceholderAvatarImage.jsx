import PropTypes from "prop-types";
import styles from "./PlaceholderAvatarImage.module.css";

const PlaceholderAvatarImage = ({ className }) => {
  return <div className={`${styles.avaterplaceholder} ${className}`}></div>;
};

PlaceholderAvatarImage.propTypes = {
  className: PropTypes.string,
};
export default PlaceholderAvatarImage;