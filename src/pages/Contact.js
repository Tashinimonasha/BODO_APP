import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Constructing the mailto link with the form data
        const mailtoLink = `mailto:3treecrops2@gmail.com?subject=Contact Form Submission from ${formData.name}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
        
        // Redirecting to the mail client
        window.location.href = mailtoLink;
    };

    return (
        <div className="bg-light-blue-50 text-black min-h-screen">
            {/* Header Section */}
            <header className="py-12 bg-gradient-to-r from-light-blue-400 via-light-blue-500 to-light-blue-600 text-black text-center">
                <h1 className="text-5xl font-bold">Get in Touch</h1>
                <p className="mt-4 text-xl">We're here to help! Send us a message or give us a call.</p>
            </header>

            {/* Contact Form Section */}
            <section className="py-16 bg-yellow-400">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-semibold text-light-blue-600 mb-8">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-left text-lg font-semibold text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-light-blue-500"
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-left text-lg font-semibold text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-light-blue-500"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-left text-lg font-semibold text-gray-700">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-light-blue-500"
                                rows={6}
                            />
                        </div>

                        {/* Send Message Button with mailto link */}
                        <button
                            type="submit"
                            className="w-96 py-6 mt-4 bg-black text-white font-bold text-2xl rounded-lg border-2 border-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            <section className="py-16">
    <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold mb-8">Our Location</h2>
        <div className="overflow-hidden rounded-lg shadow-lg">
            <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126196.02631784743!2d80.7720!3d5.9982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae258f0c26c5c1f%3A0x3e7b447c2b0a24b8!2sDikwella%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1679123456789"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    </div>
</section>
        </div>
    );
};

export default Contact;
