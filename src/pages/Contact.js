import React, { useState } from 'react';

const ContactForm = () => {
    // State hooks to manage form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = {
            name,
            email,
            message,
        };

        // Send form data to backend
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('Message sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus(result.message || 'Error sending message');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error sending message.');
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="name" style={{ display: 'block' }}>Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email" style={{ display: 'block' }}>Your Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="message" style={{ display: 'block' }}>Your Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px', minHeight: '150px' }}
                    />
                </div>

                <button type="submit" style={{
                    width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px',
                    cursor: 'pointer', border: 'none'
                }}>
                    Send Message
                </button>
            </form>

            {status && <p style={{ marginTop: '20px', color: status.includes('Error') ? 'red' : 'green' }}>{status}</p>}
        </div>
    );
};

export default ContactForm;
