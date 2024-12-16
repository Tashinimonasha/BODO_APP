import React, { useState } from "react";
import img from "../assets/login/img.png";
import backgroundImage from "../assets/backgrounds/background.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate username
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);
      // Handle form submission logic here
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
            <p className="text-l text-gray-600 mb-6">Let’s Begin the Journey</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
                {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-950"
              >
                Login Now
              </button>

              <p className="text-center text-lg font-bold text-gray-600 mt-4">
                Login with
              </p>

              <div className="flex items-center justify-between mt-4">
                <button
                    type="button"
                    className="flex items-center justify-center w-full bg-red-500 text-white font-semibold py-2 rounded-lg mr-2 hover:bg-red-600"
                >
                  Login with Google
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don’t have an account?{" "}
                <a href="/register" className="text-purple-500 hover:underline">
                  Register
                </a>
              </p>
            </form>
          </div>

          {/* Right Side */}
          <div
              className="w-1/2 bg-purple-500 flex items-center justify-center p-8"
              style={{
                backgroundImage: `url(${img})`, // Use imported image here
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
          >
            <div className="bg-white p-4 rounded-full shadow-lg">
            <span
                role="img"
                aria-label="sparkle"
                className="text-yellow-500 text-4xl"
            >
              ✨
            </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
