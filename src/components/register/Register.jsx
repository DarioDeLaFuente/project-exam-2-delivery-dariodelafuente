import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../../constants/apiUrl";
import { saveToken, saveUser } from "../../utils/storage";

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="avatar">Avatar (optional)</label>
          <input
            type="url"
            id="avatar"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="banner">Banner (optional)</label>
          <input
            type="url"
            id="banner"
            name="banner"
            placeholder="Banner URL"
            value={formData.banner}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
