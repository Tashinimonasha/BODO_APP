import React from 'react';
import './home.css'; // Link to global CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for basic styling

// Import the image
import image1 from './image1.gif';

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
    </div>
  );
};

export default Home;
