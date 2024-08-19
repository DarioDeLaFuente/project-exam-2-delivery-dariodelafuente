import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../../utils/storage";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearStorage();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <Button variant="primary" size="md" type="submit" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
