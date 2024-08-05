import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../../constants/apiUrl";
import { saveToken, saveUser } from "../../utils/storage";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    banner: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[\w]+$/.test(formData.name)) {
      setError("Name must only contain letters, numbers, and underscores.");
      return;
    }

    if (!/^([\w.%+-]+)@(stud\.noroff\.no|noroff\.no)$/.test(formData.email)) {
      setError("Email must be a valid stud.noroff.no or noroff.no address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        saveToken(data.accessToken);
        saveUser({ name: formData.name, email: formData.email });
        navigate("/login");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Sign up</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingAvatar"
          label="Avatar URL (optional)"
          className="mb-3"
        >
          <Form.Control
            type="url"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingBanner"
          label="Banner URL (optional)"
          className="mb-3"
        >
          <Form.Control
            type="url"
            name="banner"
            placeholder="Banner URL"
            value={formData.banner}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button type="submit" variant="primary">
          Sign up
        </Button>
      </Form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </Container>
  );
};

export default Register;
