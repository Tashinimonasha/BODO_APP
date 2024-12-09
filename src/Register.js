import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after successful registration
import "./register.css"; // Optional: Link to CSS for styling

const Register = () => {
  const navigate = useNavigate();

  // State to handle form input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to handle error messages
  const [error, setError] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
  
    // Simple form validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      // API call to the backend
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: name,
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Registration successful:", data);
        // Redirect user after successful registration
        navigate("/login");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred during registration.");
    }
  };
  

  return (
    <div className="register-page">
      <h2 className="text-center">Welcome Back, Please Sign Up Account</h2>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>

      <p className="text-center">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
