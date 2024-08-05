import React from "react";
import styles from "./PostPlaceholderImage.module.css";

const PostPlaceholderImage = () => {
  return (
    <img
      src="https://placehold.jp/70/C5C7D0/000/250x250.png?text=XYZ"
      alt="Placeholder"
      className={styles.placeholderImage}
    />
  );
};

export default PostPlaceholderImage;
