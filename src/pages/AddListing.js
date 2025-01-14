import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/backgrounds/img_1.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = process.env.REACT_APP_API_URL;


const PostAdPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "",
        monthlyRent: "",
        district: "",
        location: "",
        phone: "",
        images: [],
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        type: "",
        monthlyRent: "",
        district: "",
        location: "",
        phone: "",
        images: "",
    });

    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title) newErrors.title = "Title is required.";
        if (!formData.description) newErrors.description = "Description is required.";
        if (!formData.type) newErrors.type = "Select the type.";
        if (!formData.monthlyRent) newErrors.monthlyRent = "Monthly rent is required.";
        if (!formData.location) newErrors.location = "Location is required.";
        if (!formData.phone) newErrors.phone = "Phone number is required.";
        if (!formData.district) newErrors.district = "Select the district.";
        if (!formData.images.length) newErrors.images = "At least one image is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input  changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length <= 10) {
            setFormData((prevData) => ({
                ...prevData,
                images: Array.from(files),
            }));
        } else {
            toast.error("You can upload a maximum of 10 images.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const authToken = localStorage.getItem("user");
        if (!authToken) {
            toast.error("You must be logged in to post an ad.");
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("type", formData.type);
        formDataToSend.append("price", formData.monthlyRent);
        formDataToSend.append("district", formData.district);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("phone", formData.phone);

        formData.images.forEach((image) => {
            formDataToSend.append("images", image);
        });

        try {
            const response = await axios.post(
                `${apiUrl}/boarding/add-listing`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Ad posted successfully!");
                setFormData({
                    title: "",
                    description: "",
                    type: "",
                    monthlyRent: "",
                    district: "",
                    location: "",
                    phone: "",
                    images: [],
                });
            }
        } catch (error) {
            console.error("Error posting ad:", error);
            toast.error("Error posting ad. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center py-12"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-center mb-6">
                    Post Your Ad
                </h1>

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
                            <option value="Student">Student</option>
                            <option value="Girls Only">Girls Only</option>
                            <option value="Boys Only">Boys Only</option>
                            <option value="Professional">Professional</option>
                            <option value="Family">Family</option>
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
{/* District Dropdown */}
<div>
    <label htmlFor="district" className="block text-lg font-semibold text-gray-700">
        District
    </label>
    <select
        id="district"
        name="district"
        value={formData.district}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
        <option value="" disabled>Select District</option>
        <option value="Ampara">Ampara</option>
        <option value="Anuradhapura">Anuradhapura</option>
        <option value="Badulla">Badulla</option>
        <option value="Batticaloa">Batticaloa</option>
        <option value="Colombo">Colombo</option>
        <option value="Galle">Galle</option>
        <option value="Gampaha">Gampaha</option>
        <option value="Hambantota">Hambantota</option>
        <option value="Jaffna">Jaffna</option>
        <option value="Kalutara">Kalutara</option>
        <option value="Kandy">Kandy</option>
        <option value="Kegalle">Kegalle</option>
        <option value="Kilinochchi">Kilinochchi</option>
        <option value="Kurunegala">Kurunegala</option>
        <option value="Mannar">Mannar</option>
        <option value="Matale">Matale</option>
        <option value="Matara">Matara</option>
        <option value="Monaragala">Monaragala</option>
        <option value="Mullaitivu">Mullaitivu</option>
        <option value="Nuwara Eliya">Nuwara Eliya</option>
        <option value="Polonnaruwa">Polonnaruwa</option>
        <option value="Puttalam">Puttalam</option>
        <option value="Ratnapura">Ratnapura</option>
        <option value="Trincomalee">Trincomalee</option>
        <option value="Vavuniya">Vavuniya</option>
    </select>
    {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
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
        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)}  // Allow only numbers and restrict length to 10
        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        maxLength="10"  // Restrict to 10 characters
        
    />
    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
</div>


                    {/* Image Upload */}
                    <div>
                        <label htmlFor="images" className="block text-lg font-semibold text-gray-700">
                            Upload Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            onChange={handleFileChange}
                            multiple
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

                        {/* Display selected images */}
                        <div className="mt-4">
                            {formData.images.length > 0 && (
                                <div className="flex space-x-2">
                                    {formData.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(image)}
                                            alt={`preview-${index}`}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md disabled:opacity-50"
                        >
                            {loading ? "Posting..." : "Post Ad"}
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
};

export default PostAdPage;
