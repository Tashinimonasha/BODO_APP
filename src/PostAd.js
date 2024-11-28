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
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    console.log("Uploaded Images:", images);
    // Add your backend API integration here
  };

  return (
    <div className="post-ad-page container">
      <div className="row justify-content-center">
        {/* Left Section */}
        <div className="col-lg-6 d-none d-lg-block">
          <h1 className="display-4 text-primary">Post Your Ad for Free</h1>
          <p className="lead">
            Reach thousands of users by posting your ad for free. Showcase your
            product with photos, a detailed description, and pricing.
          </p>
          <img
            src="https://via.placeholder.com/500x300"
            alt="Post Ad"
            className="img-fluid"
          />
        </div>

        {/* Form Section */}
        <div className="col-lg-6 col-md-8">
          <div className="form-container shadow p-4 bg-light rounded">
            <h3 className="mb-4 text-center text-primary">Post Your Ad</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
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

              <div className="form-group mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="electronics">Electronics</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="services">Services</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
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

              <div className="form-group mb-3">
                <label htmlFor="price" className="form-label">
                  Price (Optional)
                </label>
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

              <div className="form-group mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact Information
                </label>
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

              <div className="form-group mb-4">
                <label htmlFor="images" className="form-label">
                  Upload Images
                </label>
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
