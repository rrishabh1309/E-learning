import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const registerState = { username: "", password: "" };
function Register() {
  const [formData, setFormData] = useState(registerState);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );
      setMessage(res.data);

      if (res.data === "Register successfully!") {
        navigate("/login");
      }
    } catch (err) {
      setMessage("Registration failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className = "container">
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
        <button type="Submit">Register</button>
      </form>
      <p>{message}</p>
      <p>
        {" "}
        Already have an account ? <Link to="/login"> Login Here</Link>
      </p>
    </div>
  );
}

export default Register;
