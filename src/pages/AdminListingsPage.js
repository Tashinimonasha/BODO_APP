import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaSearch, FaFlag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_URL;

const AdminListingsPage = () => {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'reports'
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, listingId: null, listingTitle: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // ** Fetch all listings **
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/boarding/get-all-listings`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();
        setListings(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching listings:', err);
        toast.error('Error fetching listings');
        setError(err.message);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // ** Fetch all reports **
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/boarding/reports/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data.data || []);
      } catch (err) {
        console.error('Error fetching reports:', err);
        toast.error('Error fetching reports');
        setReports([]);
      }
    };

    if (activeTab === 'reports') {
      fetchReports();
    }
  }, [activeTab]);

  const filtered = listings.filter((listing) =>
    listing?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = reports.filter((report) =>
    report?.listing_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteListing = (id, title) => {
    setDeleteModal({ isOpen: true, listingId: id, listingTitle: title });
  };

  const handleRemoveListingFromReport = async (listingId, listingTitle) => {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove the listing "${listingTitle}" due to reports?`
    );
    if (!confirmRemove) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/boarding/delete/${listingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Listing removed successfully');
      setReports(reports.filter(r => r.listing_id !== listingId));
      setListings(listings.filter(l => l.id !== listingId));
    } catch (err) {
      console.error('Error removing listing:', err);
      toast.error('Failed to remove listing');
    }
  };

  const confirmDeleteListing = async () => {
    const { listingId } = deleteModal;
    setIsDeleting(true);
    try {
      const response = await fetch(`${apiUrl}/boarding/delete-boarding/${listingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete listing');
      }

      // Remove from local state
      const updated = listings.filter(item => item.id !== listingId);
      setListings(updated);
      setDeleteModal({ isOpen: false, listingId: null, listingTitle: null });
      toast.success('Listing deleted successfully');
    } catch (err) {
      console.error('Error deleting listing:', err);
      toast.error(err.message || 'Error deleting listing');
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, listingId: null, listingTitle: null });
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

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-gray-800">🏠 Boarding Management</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('listings')}
          className={`py-3 px-6 font-semibold transition ${
            activeTab === 'listings'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📋 All Listings ({listings.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`py-3 px-6 font-semibold transition flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaFlag /> Reports ({reports.length})
        </button>
      </div>

      {/* Loading State */}
      {(loading && activeTab === 'listings') && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* LISTINGS TAB */}
      {activeTab === 'listings' && (
        <>
          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700 font-medium">Error loading listings: {error}</p>
            </div>
          )}

          {/* Search Bar */}
          {!loading && listings.length > 0 && (
            <div className="relative mb-6 w-full md:w-1/2">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Title..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {/* Listings Table */}
          {!loading && listings.length > 0 && (
            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200 bg-white">
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="bg-blue-600 text-white uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Title</th>
                    <th className="px-5 py-3">Description</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">District</th>
                    <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((listing) => (
                <tr key={listing.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-5 py-4 font-medium">{listing.title}</td>
                  <td className="px-5 py-4 text-xs">{listing.description?.substring(0, 50)}...</td>
                  <td className="px-5 py-4">{listing.type}</td>
                  <td className="px-5 py-4">LKR {listing.price}</td>
                  <td className="px-5 py-4">{listing.district}</td>
                  <td className="px-5 py-4">{listing.location}</td>
                  <td className="px-5 py-4">{listing.phone}</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      listing.isAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {listing.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => deleteListing(listing.id, listing.title)}
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
      )}

      {/* Empty State - Listings */}
      {!loading && listings.length === 0 && !error && activeTab === 'listings' && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No listings available</p>
        </div>
      )}
      </>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <>
          {/* Search Bar */}
          {reports.length > 0 && (
            <div className="relative mb-6 w-full md:w-1/2">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Listing Title..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {/* Reports Table */}
          {reports.length > 0 && (
            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200 bg-white">
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="bg-red-600 text-white uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Listing Title</th>
                    <th className="px-5 py-3">Report Type</th>
                    <th className="px-5 py-3">Description</th>
                    <th className="px-5 py-3">Reported By Email</th>
                    <th className="px-5 py-3">Reported Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-t hover:bg-red-50 transition">
                      <td className="px-5 py-4 font-medium">{report.listing_title}</td>
                      <td className="px-5 py-4">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {report.report_type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs">{report.description?.substring(0, 50)}...</td>
                      <td className="px-5 py-4 text-xs">{report.reported_by_email}</td>
                      <td className="px-5 py-4 text-xs">{new Date(report.created_at).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          report.status === 'pending'
                            ? 'bg-blue-100 text-blue-800'
                            : report.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => handleRemoveListingFromReport(report.listing_id, report.listing_title)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-100 px-3 py-2 rounded transition flex items-center justify-center gap-2"
                          title="Remove Listing"
                        >
                          <FaTrashAlt size={14} /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-gray-500 py-6">
                        No reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State - Reports */}
          {reports.length === 0 && (
            <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-200">
              <FaFlag className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No reports available</p>
            </div>
          )}
        </>
      )}

      {/* Error State */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4h.01m-6.938-4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Title and Message */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Delete Listing</h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteModal.listingTitle}</span>? This action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteListing}
                disabled={isDeleting}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                  isDeleting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminListingsPage;
