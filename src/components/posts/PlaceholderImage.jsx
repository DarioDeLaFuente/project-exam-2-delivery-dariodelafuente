import React from "react";
import styles from "./PlaceholderImage.module.css";

const PlaceholderImage = ({ className }) => {
  return <div className={`${styles.placeholder} ${className}`}></div>;
};

export default PlaceholderImage;
