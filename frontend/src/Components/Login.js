import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      setMessage(response.data);

      if (response.data.toLowerCase().includes("login successful")) {
        localStorage.setItem("userId", formData.username);
        navigate("/user");
      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error: ", error);
      setMessage("Error during login. Please try again.");
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
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        className="container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        {message && (
          <p style={{ textAlign: "center", color: "#d63031", marginTop: "1rem" }}>{message}</p>
        )}
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Not Registered? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "0.8rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "1rem",
  width: "100%",
};

const buttonStyle = {
  padding: "0.8rem",
  backgroundColor: "#0984e3",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default Login;
