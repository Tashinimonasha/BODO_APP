import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import registerImage from "../assets/register/loginnew.jpg";
import backgroundImage from "../assets/backgrounds/background.png";
const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
    const [loading, setLoading] = useState(false); // Loading state
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
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
        formErrors.password = "Password must contain at least one uppercase letter";
        isValid = false;
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
        formErrors.password = "Password must contain at least one lowercase letter";
        isValid = false;
    } else if (!/(?=.*\d)/.test(formData.password)) {
        formErrors.password = "Password must contain at least one digit";
        isValid = false;
    } else if (!/(?=.*[@$!%*?&#])/.test(formData.password)) {
        formErrors.password = "Password must contain at least one special character (@$!%*?&#)";
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch(`${apiUrl}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    toast.success('User registered successfully & Verification email sent !', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    });
                } else {
                    toast.error(result.message || 'Something went wrong', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            } catch (error) {
                toast.error('Failed to register user.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white"
             style={{
                 backgroundImage: `url(${backgroundImage})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
             }}>
            <div className="flex w-full max-w-6xl h-full max-h-screen bg-white rounded-lg shadow-lg overflow-hidden">
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
                            disabled={loading} // Disable button when loading
                            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-950'}`}
                        >
                            {loading ? 'Logging in...' : 'Register Now'}
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
                        backgroundImage: `url(${registerImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
