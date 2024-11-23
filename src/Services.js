import React from 'react';
import './Services.css'; // Import your custom CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Service = () => {
    const services = [
        { 
            title: 'Centralized Boarding Information', 
            description: 'Access a comprehensive database of boarding options in one convenient place.' 
        },
        { 
            title: 'Efficient Search Filters', 
            description: 'Easily find the perfect boarding using filters like location, price, and amenities.' 
        },
        { 
            title: 'User-Friendly Interface', 
            description: 'Enjoy a seamless experience with an intuitive design tailored for all users.' 
        },
        { 
            title: 'Real-Time Booking and Communication Tools', 
            description: 'Book boarding facilities instantly and communicate directly with property owners.' 
        },
    ];

    return (
        <div className="service-page container mt-5">
            <h1 className="text-center text-light mb-4">Our Features</h1>
            <div className="row">
                {services.map((service, index) => (
                    <div key={index} className="col-md-6 col-lg-3 mb-4">
                        <div className="card service-card h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">{service.title}</h5>
                                <p className="card-text">{service.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Service;
