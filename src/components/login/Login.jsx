import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>

        {error && <p className="text-danger mt-3">{error}</p>}

        <Button className="mt-3" type="submit">
          Login
        </Button>
      </Form>

      <p className="mt-3">Don&apos;t have an account?</p>
      <Link to="/register">Sign up</Link>
    </>
  );
};

export default Login;
