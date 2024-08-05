import React from "react";
import { Button } from "react-bootstrap";
import styles from "../posts/ReactionButtons.module.css";

const ReactionButtons = ({ reaction, onReact }) => {
  const handleReaction = (e) => {
    e.stopPropagation();
    onReact(e);
  };

  return (
    <Button onClick={handleReaction} className={styles.reactionbutton}>
      {reaction.symbol} {reaction.count}
    </Button>
  );
};

export default ReactionButtons;
