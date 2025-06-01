import React, { useState } from 'react';
import { FaTrashAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminListingsPage = () => {
  const navigate = useNavigate();

  const dummyData = [
    {
      _id: '1',
      title: 'Modern Apartment in Colombo',
      description: 'A fully furnished apartment near Town Hall.',
      type: 'Apartment',
      monthlyRent: '45000',
      district: 'Colombo',
      location: 'Colombo 07',
      phone: '0771234567',
      username: 'shanaka123',
    },
    {
      _id: '2',
      title: 'Budget Room in Kandy',
      description: 'Ideal for university students.',
      type: 'Room',
      monthlyRent: '12000',
      district: 'Kandy',
      location: 'Kandy City',
      phone: '0712345678',
      username: 'nimal456',
    },
    {
      _id: '3',
      title: 'Luxury Boarding in Galle',
      description: 'AC room with ocean view.',
      type: 'Boarding House',
      monthlyRent: '30000',
      district: 'Galle',
      location: 'Galle Fort',
      phone: '0769876543',
      username: 'sanduni_g',
    },
    {
      _id: '4',
      title: 'Shared Room in Matara',
      description: 'Shared space for 2 people.',
      type: 'Shared Room',
      monthlyRent: '8000',
      district: 'Matara',
      location: 'Matara Central',
      phone: '0751112222',
      username: 'kasun_m',
    },
    {
      _id: '5',
      title: 'Single Room for Girls',
      description: 'Safe and private room for females.',
      type: 'Room',
      monthlyRent: '10000',
      district: 'Colombo',
      location: 'Nugegoda',
      phone: '0783334444',
      username: 'anusha98',
    },
  ];

  const [listings, setListings] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteListing = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this listing?");
    if (confirm) {
      const updated = listings.filter(item => item._id !== id);
      setListings(updated);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold bg-blue-100 px-4 py-2 rounded shadow-sm hover:bg-blue-200 transition"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">🏠 Boarding Listings</h2>

      {/* Search Bar */}
      <div className="relative mb-6 w-full md:w-1/2">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Title..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Listings Table */}
      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-blue-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Rent</th>
              <th className="px-5 py-3">District</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Username</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((listing) => (
              <tr key={listing._id} className="border-t hover:bg-blue-50 transition">
                <td className="px-5 py-4 font-medium">{listing.title}</td>
                <td className="px-5 py-4">{listing.description}</td>
                <td className="px-5 py-4">{listing.type}</td>
                <td className="px-5 py-4">Rs. {listing.monthlyRent}</td>
                <td className="px-5 py-4">{listing.district}</td>
                <td className="px-5 py-4">{listing.location}</td>
                <td className="px-5 py-4">{listing.phone}</td>
                <td className="px-5 py-4">{listing.username}</td>
                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => deleteListing(listing._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-6">
                  No listings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminListingsPage;
