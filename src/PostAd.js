import React, { useState } from "react";
import "./postAd.css"; // Add custom styles here
import "bootstrap/dist/css/bootstrap.min.css"; // Use Bootstrap for quick styling

const PostAdFree = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    contact: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Get all selected files
    setImages(selectedFiles);}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    console.log("Uploaded Images:", images);
  
    // Create a FormData object to send data including images
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("contact", formData.contact);
  
    // Append images to FormData
    images.forEach((image) => {
      formDataToSend.append("images", image);
    });
  
    // API URL (adjust this to your API endpoint)
    const apiUrl = "http://localhost:5000/api/boarding/add"; 
  
    // Make a POST request with FormData
    fetch(apiUrl, {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from API:", data);
        // Handle the response (e.g., show success message)
      })
      .catch((error) => {
        console.error("Error posting ad:", error);
        // Handle error (e.g., show error message)
      });
  };
  

  return (
    <div className="post-ad-page container">
      <div className="row justify-content-center">
        {/* Left Section with Image */}
        <div className="col-lg-6 d-none d-lg-block">
          <h1 className="display-4 text-primary">Post Your Ad for Free</h1>
          <p className="lead">
            Reach thousands of users by posting your ad for free. Showcase your
            product with photos, a detailed description, and pricing.
          </p>
          <img
            src="/image1.jpg"  // Update with correct image path
            alt="Post Ad"
            className="img-fluid"
          />
        </div>

        {/* Form Section */}
        <div className="col-lg-6 col-md-8">
          <div className="form-container shadow p-4 bg-light rounded">
            <h3 className="mb-4 text-center text-primary">Post Your Ad</h3>
            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="Ad Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category Input */}
              <div className="form-group mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="services">Services</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Description Input */}
              <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Describe your ad here"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Price Input */}
              <div className="form-group mb-3">
                <label htmlFor="price" className="form-label">Price (Optional)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                  placeholder="Price (if applicable)"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              {/* Contact Information */}
              <div className="form-group mb-3">
                <label htmlFor="contact" className="form-label">Contact Information</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="form-control"
                  placeholder="Your phone or email"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="form-group mb-4">
                <label htmlFor="images" className="form-label">Upload Images</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                />
              </div>
              

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 text-uppercase"
              >
                Post Ad
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdFree;
