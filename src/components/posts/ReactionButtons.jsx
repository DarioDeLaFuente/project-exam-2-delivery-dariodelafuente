import PropTypes from "prop-types";
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

ReactionButtons.propTypes = {
  reaction: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  onReact: PropTypes.func.isRequired,
};

export default ReactionButtons;
