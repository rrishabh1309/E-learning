import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", formData);
      setMessage(response.data);

      if (response.data.toLowerCase().includes("register successfully")) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage: "url('/e-learning-theme.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"
      }}
    >
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
        <p>
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;