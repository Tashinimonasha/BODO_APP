import React, { useState } from 'react';
import './login.css'; // Make sure this file exists and is linked correctly
import { useNavigate } from "react-router-dom"; // For navigation after successful registration
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for basic styling

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login Successful:', data);
        
        // Save token to localStorage (optional)
        localStorage.setItem('token', data.token);
        navigate("/index");
       // alert('Login successful!');
        // Redirect or perform further actions
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-container">
        <h2 className="text-center mb-4 highlight-text">Welcome Back, Please Sign In to Your Account</h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="form-group mb-4 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            {/* Eye Icon to toggle password visibility */}
            <i 
              className={`eye-icon ${showPassword ? 'show' : ''}`} 
              onClick={() => setShowPassword(!showPassword)}
            >
            
            </i>
          </div>

          <button type="submit" className="btn btn-yellow w-100">Login</button>
        </form>

        <div className="social-login text-center mt-4">
          {/* Facebook Login Button */}
          <button className="btn btn-facebook w-100 mb-2">
            <i className="fab fa-facebook-f"></i> Login with Facebook
          </button>

          {/* Google Login Button */}
          <button className="btn btn-google w-100">
            <i className="fab fa-google"></i> Login with Google
          </button>
        </div>

        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
