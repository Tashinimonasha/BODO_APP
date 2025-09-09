import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
const apiUrl = process.env.REACT_APP_API_URL;

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { 
            name, 
            email, 
            phone, 
            message,
            toEmail: 'tashinimonasha44@gmail.com', // Your email address
            subject: 'New Contact Form Submission - BODO APP'
        };

        try {
            const response = await fetch(`${apiUrl}/user/contact-us`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Message sent successfully! We will get back to you soon.');
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                toast.error(result.message || 'Error sending message');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error sending message. Please try again later.');
        }
    };

    const whatsappNumber = '+94775801679'; // Replace with the actual WhatsApp number

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-2 gap-8">
                {/* Left side - Map and Contact Info */}
                <div>
                    <iframe
                        title="Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385596634!2d80.19675765820313!3d6.053518999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c03!2sGalle!5e0!3m2!1sen!2slk!4v1693568789012!5m2!1sen!2slk"
                        className="w-full h-64 rounded-lg mb-6"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    />
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="text-blue-600 mr-3 text-xl" />
                            <p>No:17, Galle, Southern, Sri Lanka</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaPhone className="text-blue-600 mr-3 text-xl" />
                            <p>+94742388071, +94775801679</p>
                        </div>
                    </div>
                </div>

                {/* Right side - Contact Form */}
                <div>
                    <h2 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 mb-2">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="e.g johndoe@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">Phone Number</label>
                            <div className="flex">
                                <select className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2">
                                    <option value="+94">+94</option>
                                </select>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">Message or Enquiry</label>
                            <textarea
                                placeholder="Type something"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-32"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Send Message
                        </button>

                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 mt-4"
                        >
                            <FaWhatsapp className="text-xl mr-2" />
                            Chat with us on WhatsApp
                        </a>
                    </form>
                </div>
            </div>

            {/* ToastContainer for displaying messages */}
            <ToastContainer />
        </div>
    );
};

export default ContactForm;
