import React from "react";
import "./header.css"; // Link to CSS for styling
import image1 from './logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo.img">
        <img src={image1}alt="BODO APP Logo" />
        <span>BODO APP</span>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/rooms">Rooms</a></li>
          <li><a href="/annex">Annex</a></li>
          <li><a href="/hostel">Hostel</a></li>
          <li><a href="/apartments">Apartments</a></li> 
          <li className="dropdown">
            <a href="/services">Our Services</a>
            <div className="dropdown-content">
              <a href="/service1">Service 1</a>
              <a href="/service2">Service 2</a>
            </div>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="register">Register</button>
        <button className="post-ad">Post Ad Free</button>
      </div>
    </header>
  );
};

export default Header;
