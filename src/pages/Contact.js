import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = process.env.REACT_APP_API_URL;

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { name, email, phone, message };

        try {
            const response = await fetch(`${apiUrl}/user/contact-us`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Message sent successfully!');
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                toast.error(result.message || 'Error sending message');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error sending message.');
        }
    };

    const whatsappNumber = '0742388071'; // Replace with the actual WhatsApp number

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border-2 border-yellow-500">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Contact Us</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Your Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Your Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>

                {/* WhatsApp Feature */}
                <div className="mt-6 text-center">
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        <span className="mr-2">Chat with us on WhatsApp</span>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png"
                            alt="WhatsApp"
                            className="w-6 h-6"
                        />
                    </a>
                </div>
            </div>

            {/* ToastContainer for displaying messages */}
            <ToastContainer />
        </div>
    );
};

export default ContactForm;
