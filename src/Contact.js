// ContactPage.js
import React from "react";
import "./Contact.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-left">
        <h2>Get in touch with us</h2>
        <p>
          We are a BPO Company based in Australia and Sri Lanka. We provide business process outsourcing services to Australian companies and overseas.
        </p>
        <div className="branch">
          <h3>🇦🇺 AUSTRALIAN BRANCH</h3>
          <p>
            <strong>Address:</strong> 574 Plummers St Port Melbourne VIC 3207
          </p>
          <p>
            <strong>Call Us:</strong> +61 370 190 439
          </p>
        </div>
        <div className="branch">
          <h3>🇱🇰 SRI LANKAN BRANCH</h3>
          <p>
            <strong>Address:</strong> 12A/005, Church Road, Liyanagemulla
          </p>
          <p>
            <strong>Call Us:</strong> +94 112 258 528
          </p>
        </div>
        <div className="social-media">
          <h3>Follow us:</h3>
          <div className="icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      <div className="contact-right">
        <h2>Get in touch with us</h2>
        <p>We’re here to assist you with any inquiries or support you may need. Reach out to us via email or call us.</p>
        <form>
          <label>
            Your Name
            <input type="text" placeholder="Enter Your Name" />
          </label>
          <label>
            Your Email
            <input type="email" placeholder="Enter Your Email" />
          </label>
          <label>
            Topic
            <select>
              <option>Web Design Project</option>
              <option>Development Inquiry</option>
              <option>General Inquiry</option>
            </select>
          </label>
          <label>
            Message
            <textarea placeholder="Enter your Message here"></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
