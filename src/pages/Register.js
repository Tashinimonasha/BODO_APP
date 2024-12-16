import React, { useState } from "react";
import registerImage from "../assets/register/loginnew.jpg";
import backgroundImage from "../assets/backgrounds/background.png";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateForm = () => {
        let formErrors = { name: "", email: "", password: "", confirmPassword: "" };
        let isValid = true;

        // Validate name
        if (!formData.name) {
            formErrors.name = "Full Name is required";
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            formErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Enter a valid email address";
            isValid = false;
        }

        // Validate password
        if (!formData.password) {
            formErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        // Validate confirm password
        if (formData.confirmPassword !== formData.password) {
            formErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Handle form submission logic here
            console.log(formData);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white"
             style={{
                 backgroundImage: `url(${backgroundImage})`,
                 backgroundSize: 'cover', // Ensures the image covers the entire div
                 backgroundPosition: 'center', // Centers the image
             }}>
            <div className="flex w-full max-w-6xl h-full max-h-screen bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left Side */}
                <div className="w-1/2 p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">REGISTER</h1>
                    <p className="text-sm text-gray-600 mb-6">Create an account to get started!</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-950"
                        >
                            Register Now
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{" "}
                            <a href="/login" className="text-purple-500 hover:underline">
                                Login
                            </a>
                        </p>
                    </form>
                </div>

                {/* Right Side */}
                <div
                    className="w-1/2 bg-purple-500 flex items-center justify-center p-8"
                    style={{
                        backgroundImage: `url(${registerImage})`, // Use imported image here
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >

                </div>
            </div>
        </div>
    );
};

export default Register;
