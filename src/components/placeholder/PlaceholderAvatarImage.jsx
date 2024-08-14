import React from "react";
import styles from "./PlaceholderAvatarImage.module.css";

const PlaceholderAvatarImage = ({ className }) => {
  return <div className={`${styles.avaterplaceholder} ${className}`}></div>;
};

export default PlaceholderAvatarImage;
