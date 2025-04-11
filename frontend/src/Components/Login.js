import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const loginState = { username: "", password: "" };

function Login() {
  const [formData, setFormData] = useState(loginState);
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

      if (response.data === "Login Successful!") {
        localStorage.setItem("userId", formData.username);
        navigate("/user");
      } else if (response.data === "User Not found") {
        setMessage(
          "Invalid user id or user not registered. Click on register below."
        );
      }
    } catch (error) {
      console.error("Login error: ", error);
      setMessage("Error during login");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="userName"
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
        <button type="Submit">Login </button>
      </form>
      <p>{message}</p>
      <p>
        {" "}
        Not Registered ? <Link to="/register"> Register Here </Link>
      </p>
    </div>
  );
}

export default Login;
