import React from "react";
import "./css/home.css"; // Global CSS
import "./css/Contact.css"; // Global CSS
import "./css/Services.css"; // CSS for Services section
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling

// Import the image
import image1 from "./assets/image1.gif";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={image1} alt="Welcome" className="hero-image" />
        <div className="hero-overlay">
          <button className="explore-button">Explore Now</button>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section container mt-5">
        <h2 className="text-center text-dark mb-4">About BODO APP</h2>
        <p className="text-center">
          BODO APP is your ultimate solution for finding nearby boarding facilities tailored to your needs. Whether it's a cozy annex, a spacious apartment, or a convenient hostel, we've got you covered. Our platform connects property owners and seekers, ensuring a seamless experience for everyone.
        </p>
      </div>

      {/* Services Section */}
      <div className="services-section container mt-5">
        <h2 className="text-center text-dark mb-4">Our Services</h2>
        <div className="service-card">
          <h3 className="service-title">Boarding Finder</h3>
          <p className="service-description">
            Looking for a place to stay? Use our Boarding Finder to locate the nearest and most suitable accommodations based on your preferences. Whether you're a student or a worker, we've got you covered.
          </p>
          <button className="btn btn-primary">Explore Boarding Finder</button>
        </div>
        <div className="service-card">
          <h3 className="service-title">Boarding Owners</h3>
          <p className="service-description">
            If you own a boarding house, list your property with us to reach potential tenants quickly and efficiently. Manage your properties with ease using our platform.
          </p>
          <button className="btn btn-success">Manage Your Properties</button>
        </div>
        <div className="service-card">
          <h3 className="service-title">Add Boarding Ads</h3>
          <p className="service-description">
            Promote your boarding house by creating attractive ads. Share details, photos, and pricing to attract the right tenants.
          </p>
          <button className="btn btn-warning">Post a Boarding Ad</button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-container mt-5">
        {/* Contact Details Section */}
        <section className="contact-details">
          <h1>Get in Touch</h1>
          <div className="contact-cards">
            {/* Address */}
            <div className="contact-card">
              <div className="icon">📍</div>
              <h2>Address</h2>
              <p>
                BODO Office, <br />
                Colombo, Sri Lanka <br />
                Southern Division Office <br />
                Postal Code: 80000
              </p>
            </div>
            {/* Phone */}
            <div className="contact-card">
              <div className="icon">📞</div>
              <h2>Phone</h2>
              <p>
                BODO Group Contracting <br />
                +94 712 927 161 <br />
                +94 723 000 823 <br />
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
                <a href="mailto:bodoapp.lk@gmail.com">bodoapp.lk@gmail.com</a> <br />
                Service Calls: <br />
                <a href="mailto:tashinimonasha44@gmail.com">tashinimonasha44@gmail.com</a>
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
    </div>
  );
};

export default Home;
