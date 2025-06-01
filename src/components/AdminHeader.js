import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout successful!");
    setTimeout(() => {
      navigate("/");
    }, 1500); // wait for toast to show before navigating
  };

  return (
    <>
      <header className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">🏢 Admin Panel</h1>
        <nav className="flex gap-6 text-sm">
          <Link to="/admin/dashboard" className="hover:text-blue-300">
            Dashboard
          </Link>
          <Link to="/admin/listings" className="hover:text-blue-300">
            Listings
          </Link>
          <Link to="/admin/users" className="hover:text-blue-300">
            Users
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </nav>
      </header>
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </>
  );
};

export default AdminHeader;
