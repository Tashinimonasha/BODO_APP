import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = process.env.REACT_APP_API_URL;

Modal.setAppElement('#root');

const ListingsPage = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentListingId, setCurrentListingId] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [currentListingData, setCurrentListingData] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("No token found, please log in.");
                    setLoading(false);
                    return;
                }

                const userData = localStorage.getItem('user');
                if (!userData) {
                    setError("No user data found.");
                    setLoading(false);
                    return;
                }

                const parsedUserData = JSON.parse(userData);
                const userId = parsedUserData.uid;

                const response = await axios.get(`${apiUrl}/boarding/user-listings/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setListings(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching listings');
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    const openDeleteModal = (listingId) => {
        setCurrentListingId(listingId);
        setModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setModalIsOpen(false);
        setCurrentListingId(null);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${apiUrl}/boarding/${currentListingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setListings(listings.filter(listing => listing.listingId !== currentListingId));
                toast.success("Listing deleted successfully!");
            }
        } catch (error) {
            toast.error('Error deleting listing');
        } finally {
            setIsDeleting(false);
            closeDeleteModal();
        }
    };

    const openEditModal = (listingId) => {
        const listingToEdit = listings.find(listing => listing.listingId === listingId);
        if (listingToEdit) {
            setCurrentListingId(listingToEdit.listingId); // Set currentListingId as well
            setCurrentListingData({ ...listingToEdit });  // Ensure data is set properly
            setEditModalIsOpen(true);
        }
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setCurrentListingData(null);
    };

    const handleEdit = async () => {
        if (!currentListingData) return;
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${apiUrl}/boarding/update-listing/${currentListingId}`, currentListingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                const updatedListings = listings.map(listing =>
                    listing.listingId === currentListingId ? currentListingData : listing
                );
                setListings(updatedListings);
                toast.success("Listing updated successfully!");
                closeEditModal();
            }
        } catch (error) {
            toast.error('Error updating listing');
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage and monitor your property listings
                    </p>
                </div>

                {listings.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <div className="mx-auto h-12 w-12 text-gray-400">
                            <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No listings</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new listing.</p>
                        <div className="mt-6">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
                                onClick={() => window.location.href='/addListning'}
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add New Listing
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {listings.map((listing) => (
                            <div
                                key={listing.listingId}
                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 ease-in-out"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">{listing.title}</h2>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => openEditModal(listing.listingId)}
                                                className="inline-flex items-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 hover:shadow-md transform hover:scale-105 transition-all duration-200 ease-in-out"
                                            >
                                                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(listing.listingId)}
                                                className="inline-flex items-center px-4 py-2 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 bg-white hover:bg-red-50 hover:border-red-600 hover:text-red-600 hover:shadow-md transform hover:scale-105 transition-all duration-200 ease-in-out"
                                                disabled={isDeleting}
                                            >
                                                <TrashIcon className="h-5 w-5 mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {listing.images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`Image ${index + 1}`}
                                                        className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                                                    <p className="text-sm font-medium text-gray-500">District</p>
                                                    <p className="mt-1 text-lg font-semibold text-gray-900">{listing.district}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                                                    <p className="text-sm font-medium text-gray-500">Location</p>
                                                    <p className="mt-1 text-lg font-semibold text-gray-900">{listing.location}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                                                    <p className="text-sm font-medium text-gray-500">Price</p>
                                                    <p className="mt-1 text-lg font-semibold text-green-600">LKR {listing.price}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                                    <p className="mt-1 text-lg font-semibold text-gray-900">{listing.phone}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm font-medium text-gray-500">Description</p>
                                                <p className="mt-1 text-gray-900">{listing.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Custom Confirmation Modal */}
            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Confirm Deletion"
                className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            >
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <TrashIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Delete Listing</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Are you sure you want to delete this listing? This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={closeDeleteModal}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Listing"
                className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            >
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Edit Listing</h3>
                        <button
                            onClick={closeEditModal}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={currentListingData?.title || ''}
                                onChange={(e) => setCurrentListingData({ ...currentListingData, title: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                            <input
                                type="text"
                                value={currentListingData?.district || ''}
                                onChange={(e) => setCurrentListingData({ ...currentListingData, district: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                value={currentListingData?.location || ''}
                                onChange={(e) => setCurrentListingData({ ...currentListingData, location: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (LKR)</label>
                            <input
                                type="number"
                                value={currentListingData?.price || ''}
                                onChange={(e) => setCurrentListingData({ ...currentListingData, price: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                value={currentListingData?.phone || ''}
                                onChange={(e) => setCurrentListingData({ ...currentListingData, phone: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={currentListingData?.description || ''}
                                onChange={(e) => setCurrentListingData({ ...currentListingData, description: e.target.value })}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={closeEditModal}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default ListingsPage;
