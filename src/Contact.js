import React from "react";
import "./Contact.css";

const ContactPage = () => {
  return (
    <div className="contact-container">
      {/* Contact Details Section */}
      <section className="contact-details">
        <h1>Get in Touch</h1>
        <div className="contact-cards">
          {/* Address */}
          <div className="contact-card">
            <div className="icon">📍</div>
            <h2>Address</h2>
            <p>
            BODO Office,  <br />
            Colombo,Sri Lanka   <br />
             
              <br />
              Southren Division Office <br />
            
              postal code, 80000
            </p>
          </div>
          {/* Phone */}
          <div className="contact-card">
            <div className="icon">📞</div>
            <h2>Phone</h2>
            <p>
              BODO Group Contracting <br />
              +94 712 927 161 phone <br />
              +94 723 000 823 phone <br />
              <br />
              24/7 Service Department <br />
              Press 2 for emergencies
            </p>
          </div>
          {/* Email */}
          <div className="contact-card">
            <div className="icon">✉️</div>
            <h2>Email</h2>
            <p>
              Proposal Requests: <br />
              <a href="mailto:info@weifieldgroup.com">bodoapp.lk@gmail.com</a> <br />
              Service Calls: <br />
              <a href="mailto:service@weifieldcontracting.com">tashinimonasha44@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Message Us Section */}
      <section className="message-section">
        <h2>Message Us</h2>
        <p>
        Have questions or need assistance? We're here to help you find the perfect boarding accommodation. 
        Reach out to us for any inquiries or feedback, and we'll be happy to assist you!
        </p>
        <form className="message-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Comments</label>
            <textarea placeholder="Enter your message"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
