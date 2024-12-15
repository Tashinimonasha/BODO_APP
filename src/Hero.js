import React from "react";
import "./css/Hero.css"; // Link to CSS for styling

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Looking for a Place to Rent Out Near Your University?</h2>
        <h1>Sri Lankan Best Place to Find / Rent Your University Boarding Places Fast & Quick...!</h1>
        <div className="search-bar">
          <input type="text" placeholder="What are you Looking for" />
          <input type="text" placeholder="Select University" />
          <button className="search-button">Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
