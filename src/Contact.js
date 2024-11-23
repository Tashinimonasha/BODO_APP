// Contact.js
import React, { useState } from 'react';
import './App.css'; // Import your custom CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., send data to API)
        console.log('Form submitted:', formData);
    };

    return (
        <div className="contact-page container mt-5">
            <h1 className="text-center text-light mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit} className="form-group">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="contact-info text-center text-light mt-5">
                <p>Email: info@example.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Follow us on social media:</p>
                <div>
                    <a href="https://facebook.com" className="text-light me-3">Facebook</a>
                    <a href="https://instagram.com" className="text-light me-3">Instagram</a>
                    <a href="https://github.com" className="text-light">GitHub</a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
