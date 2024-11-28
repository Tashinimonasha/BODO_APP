import React from "react";
import "./Services.css"; // Link your custom CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Use Bootstrap for styling

const Services = () => {
  return (
    <div className="services-page">
      <div className="container my-5">
        <h1 className="text-center mb-4">Our Services</h1>
        
        {/* Boarding Finder Section */}
        <div className="service-card">
          <h2 className="service-title">Boarding Finder</h2>
          <p className="service-description">
            Looking for a place to stay? Use our Boarding Finder to locate the nearest and most suitable accommodations
            based on your preferences. Whether you're a student or a worker, we've got you covered.
          </p>
          <button className="btn btn-primary">Explore Boarding Finder</button>
        </div>

        {/* Boarding Owners Section */}
        <div className="service-card">
          <h2 className="service-title">Boarding Owners</h2>
          <p className="service-description">
            If you own a boarding house, list your property with us to reach potential tenants quickly and efficiently.
            Manage your properties with ease using our platform.
          </p>
          <button className="btn btn-success">Manage Your Properties</button>
        </div>

        {/* Add Boarding Ads Section */}
        <div className="service-card">
          <h2 className="service-title">Add Boarding Ads</h2>
          <p className="service-description">
            Promote your boarding house by creating attractive ads. Share details, photos, and pricing to attract the
            right tenants.
          </p>
          <button className="btn btn-warning">Post a Boarding Ad</button>
        </div>
      </div>

      {/* Google Sheets Integration */}
      <div className="container my-5">
        <h2 className="text-center">Manage Boarding Data</h2>
        <iframe
          title="Google Sheets"
          src="https://docs.google.com/spreadsheets/d/your-sheet-id/edit?usp=sharing"
          width="100%"
          height="400"
          className="google-sheets-embed"
        ></iframe>
        <p className="text-center mt-3">
          Use the above sheet to manage and view all your boarding-related data. 
          You can edit and share it with ease.
        </p>
      </div>
    </div>
  );
};

export default Services;
