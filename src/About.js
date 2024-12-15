import React from 'react';
import './css/about.css'; // Link to About Page-specific CSS
 

const About = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="about-header">
        <h1 className="text-center">About BODO APP</h1>
      </div>

      {/* About Section */}
      <div className="about-content container mt-5">
        <h2 className="text-center text-dark mb-4">What is BODO APP?</h2>
        <p>
          BODO APP is your go-to platform for finding boarding accommodations with ease. 
          Whether you're a student seeking a convenient hostel near your university or a professional looking for a temporary stay close to your workplace, BODO APP connects you with options tailored to your needs. 
          Our goal is to make the process of finding boarding facilities simple, reliable, and hassle-free.
        </p>

        <h2 className="text-center text-dark mt-5 mb-4">Why Choose Us?</h2>
        <ul className="about-list">
          <li>We offer a diverse range of boarding options to suit every preference and budget.</li>
          <li>Our user-friendly interface ensures a seamless experience for property seekers.</li>
          <li>Verified listings to ensure quality and reliability.</li>
          <li>Direct communication with property owners to make arrangements quick and easy.</li>
        </ul>

        <h2 className="text-center text-dark mt-5 mb-4">Our Mission</h2>
        <p>
          At BODO APP, our mission is to bridge the gap between property owners and seekers, providing an efficient and trustworthy platform for finding temporary accommodations. 
          We aim to improve the boarding experience for everyone by ensuring a transparent and secure process.
        </p>
      </div>

      {/* Team Section */}
      <div className="team-section container mt-5">
        <h2 className="text-center text-dark mb-4">Meet the Team</h2>
        <p className="text-center">
          Our dedicated team of developers, designers, and support staff works tirelessly to deliver a platform that meets your expectations. 
          We are passionate about innovation and committed to improving your experience every step of the way.
        </p>
      </div>
    </div>
  );
};

export default About;
