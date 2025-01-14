import React, { useState } from "react";
import backgroundImage from "../assets/forgotpassword/forgot.jpg"; // Import the local image
const apiUrl = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden h-[400px]">
        
        {/* Left Side - Image with Local Asset */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`, // Local image usage
          }}
        ></div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-700 text-center mt-0 mb-6">
            Have you forgotten your password!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
              }`}
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </form>

          {/* Message Section */}
          {message && (
            <div className="text-center mt-4">
              <p className="text-sm text-green-500">{message}</p>
              {/* Login Button Below Message */}
              <a
                href="/login"
                className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                You can now Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
