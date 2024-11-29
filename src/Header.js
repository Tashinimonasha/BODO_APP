import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./header.css"; // Link to CSS for styling
import image1 from './logo.png';

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-img">
        <img src={image1} alt="BODO APP Logo" />
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/rooms">Rooms</a></li>
          <li><a href="/annex">Annex</a></li>
          <li><a href="/hostel">Hostel</a></li>
          <li><a href="/apartments">Apartments</a></li>
          
          <li className="dropdown">
            <a style={{ paddingRight: '30px' }} href="/Contact">Contact</a>
            <a href="/services">Our Services</a>   
          </li>
        </ul>
      </nav>

      {/* Authentication Buttons */}
      <div className="auth-buttons">
        <button className="login" onClick={() => navigate("/login")}>Login</button>
        <button className="register" onClick={() => navigate("/register")}>Register</button>
        <button className="post-ad" onClick={() => navigate("/post-ad")}>Post Ad Free</button>
      </div>
    </header>
  );
};

export default Header;
