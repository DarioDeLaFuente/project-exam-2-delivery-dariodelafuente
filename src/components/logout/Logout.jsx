import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <Button variant="primary" size="lg" type="submit" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
