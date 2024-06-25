import React from "react";
import { Button } from "react-bootstrap";

const ReactionButtons = ({ reaction, onReact }) => {
  const handleReaction = () => {
    onReact(reaction.symbol);
  };

  return (
    <Button onClick={handleReaction}>
      {reaction.symbol} {reaction.count}
    </Button>
  );
};

export default ReactionButtons;
