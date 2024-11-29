import React, { useState } from 'react';
import './login.css'; // Make sure this file exists and is linked correctly
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for basic styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Login button clicked!');
    console.log('Login Details:', { email, password });
    
    // Add authentication logic here (API call or validation)
    if (email && password) {
      alert('Login successful!');
    } else {
      alert('Please enter valid credentials!');
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
              👁️
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
