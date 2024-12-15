import React from "react";
import "./css/Footer.css"; // Link to CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* User Menu */}
        <div className="footer-section">
          <h4 className="footer-heading">User Menu</h4>
          <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/account">My Account</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/terms">Terms and Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/packages">Packages</a></li>
            <li><a href="/community">Join Our Community</a></li>
          </ul>
        </div>

        {/* Recent Posts */}
        <div className="footer-section">
          <h4 className="footer-heading">Recent Posts</h4>
          <p>Find the best boarding places fast and quick with BODO APP!</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email address" />
            <button>➔</button>
          </div>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <p><i className="fas fa-map-marker-alt"></i> BODO Office, Colombo, Sri Lanka</p>
          <p><i className="fas fa-phone"></i> +94 712 927 161</p>
          <p><i className="fas fa-envelope"></i> bodoapp.lk@gmail.com</p>
          <p><i className="fas fa-clock"></i> Mon-Sun: 8:00 AM - 8:00 PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 BODO APP. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
