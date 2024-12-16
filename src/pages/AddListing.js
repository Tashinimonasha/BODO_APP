import React, { useState } from "react";
import backgroundImage from "../assets/backgrounds/background.png";

const PostAdPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "",
        monthlyRent: "",
        location: "",
        phone: "",
        images: [],
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        type: "",
        monthlyRent: "",
        location: "",
        phone: "",
        images: "",
    });

    const validateForm = () => {
        const newErrors = {};

        // Title Validation
        if (!formData.title) {
            newErrors.title = "Title is required.";
        } else if (formData.title.length > 100) {
            newErrors.title = "Title cannot be more than 100 characters.";
        }

        // Description Validation
        if (!formData.description) {
            newErrors.description = "Description is required.";
        } else if (formData.description.length > 500) {
            newErrors.description = "Description cannot be more than 500 characters.";
        }

        // Type Validation
        if (!formData.type) {
            newErrors.type = "Type is required.";
        } else if (!["Rent", "Sale"].includes(formData.type)) {
            newErrors.type = "Type must be 'Rent' or 'Sale'.";
        }

        // Monthly Rent Validation
        if (!formData.monthlyRent) {
            newErrors.monthlyRent = "Monthly rent is required.";
        } else if (formData.monthlyRent <= 0) {
            newErrors.monthlyRent = "Monthly rent must be a positive number.";
        }

        // Location Validation
        if (!formData.location) {
            newErrors.location = "Location is required.";
        }

        // Phone Validation (Regex for a valid phone number format)
        const phoneRegex = /^[0-9]{10}$/; // 10 digits
        if (!formData.phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits.";
        }

        // Image Validation
        if (formData.images.length === 0) {
            newErrors.images = "At least one image is required.";
        } else if (formData.images.length > 5) {
            newErrors.images = "You can upload a maximum of 5 images.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length <= 5) {
            setFormData((prevData) => ({
                ...prevData,
                images: Array.from(files),
            }));
        } else {
            alert("You can upload a maximum of 5 images.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            alert("Ad posted successfully!");
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center py-12"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Post Your Ad</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-lg font-semibold text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    {/* Type */}
                    <div>
                        <label htmlFor="type" className="block text-lg font-semibold text-gray-700">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Type</option>
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                    </div>

                    {/* Monthly Rent */}
                    <div>
                        <label htmlFor="monthlyRent" className="block text-lg font-semibold text-gray-700">
                            Monthly Rent
                        </label>
                        <input
                            type="number"
                            id="monthlyRent"
                            name="monthlyRent"
                            value={formData.monthlyRent}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.monthlyRent && <p className="text-red-500 text-sm">{errors.monthlyRent}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-lg font-semibold text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-lg font-semibold text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="images" className="block text-lg font-semibold text-gray-700">
                            Upload Images (Max 5)
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            multiple
                            accept="image/*"
                        />
                        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

                        {/* Display selected images */}
                        {formData.images.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative group border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={image.name}
                                            className="object-cover w-full h-32"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500 focus:ring-4 focus:ring-blue-300"
                        >
                            Post Ad
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostAdPage;
