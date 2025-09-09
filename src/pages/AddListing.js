import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = process.env.REACT_APP_API_URL;

const AddListing = () => {
    // Add shake animation style
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-5px); }
                40%, 80% { transform: translateX(5px); }
            }
            .animate-shake {
                animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);
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
        if (!formData.images.length) newErrors.images = "Please add at least one photo.";
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
        const files = Array.from(e.target.files);
        if (files.length <= 10) {
            setFormData((prevData) => ({
                ...prevData,
                images: files,
            }));
        } else {
            toast.error("You can upload a maximum of 10 images.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => window.history.back()} 
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-800">Post Your Ad</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column - Form */}
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-1">List an item</h2>
                                <p className="text-sm text-gray-500">Never provide any private information anywhere on unique needs!</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gradient-to-r from-blue-50 to-indigo-50"
                                    placeholder="Enter title for your boarding place"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gradient-to-r from-blue-50 to-indigo-50 placeholder-gray-500"
                                    placeholder="Describe your boarding place in detail (facilities, rules, etc.)"
                                    style={{ resize: 'none' }}
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>

                            {/* Type & Monthly Rent Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gradient-to-r from-blue-50 to-indigo-50"
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

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Monthly Rent (LKR)</label>
                                    <input
                                        type="number"
                                        name="monthlyRent"
                                        value={formData.monthlyRent}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gradient-to-r from-blue-50 to-indigo-50"
                                        placeholder="Enter monthly rent"
                                    />
                                    {errors.monthlyRent && <p className="text-red-500 text-sm">{errors.monthlyRent}</p>}
                                </div>
                            </div>

                            {/* District & Location Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">District</label>
                                    <select
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gradient-to-r from-blue-50 to-indigo-50"
                                    >
                                        <option value="">Select District</option>
                                        {["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", 
                                          "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
                                          "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
                                          "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"].map(district => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gradient-to-r from-blue-50 to-indigo-50"
                                        placeholder="Enter specific location"
                                    />
                                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gradient-to-r from-blue-50 to-indigo-50"
                                    placeholder="Enter phone number"
                                    maxLength="10"
                                    onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Posting your Advertisement...
                                        </span>
                                    ) : (
                                        <>
                                            Post Advertisement
                                            <span className="ml-2">→</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                        {/* Right Column - Preview and Image Upload */}
                        <div className="lg:w-[450px] bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="sticky top-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Images</h3>
                                
                                {/* Main Upload Area */}
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 transition-all hover:border-blue-400 bg-gray-50 mb-6">
                                    <input
                                        type="file"
                                        name="images"
                                        onChange={handleFileChange}
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        id="images"
                                    />
                                    <label 
                                        htmlFor="images"
                                        className="cursor-pointer flex flex-col items-center justify-center gap-4"
                                    >
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-blue-600">Click to upload</p>
                                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 10 images</p>
                                        </div>
                                    </label>
                                </div>
                                {errors.images && <p className="text-red-500 text-sm mt-2">{errors.images}</p>}

                                {/* Image Previews */}
                                {formData.images.length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-700">Selected Images</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {Array.from(formData.images).map((image, index) => (
                                                <div key={index} className="relative aspect-w-4 aspect-h-3">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`preview-${index}`}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newImages = [...formData.images];
                                                            newImages.splice(index, 1);
                                                            setFormData(prev => ({ ...prev, images: newImages }));
                                                        }}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Example Images */}
                                {formData.images.length === 0 && (
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-700">Example Images</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden">
                                                <img 
                                                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                                                    alt="Example 1" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden">
                                                <img 
                                                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                                                    alt="Example 2" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AddListing;
