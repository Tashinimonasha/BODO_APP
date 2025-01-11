import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

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

                const response = await axios.get(`http://localhost:3000/api/boarding/user-listings/${userId}`, {
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
            const response = await axios.delete(`http://localhost:3000/api/boarding/${currentListingId}`, {
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
        setCurrentListingData(listingToEdit);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setCurrentListingData(null);
    };

    const handleEdit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:3000/api/boarding/${currentListingId}`, currentListingData, {
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
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Listings</h1>
            <div className="grid grid-cols-1 gap-8">
                {listings.length === 0 ? (
                    <p className="text-center col-span-full">No listings found</p>
                ) : (
                    listings.map((listing) => (
                        <div
                            key={listing.listingId}
                            className="w-full max-w-4xl mx-auto rounded-lg border border-gray-300 shadow-lg bg-white flex flex-col"
                        >
                            <div className="p-6 flex flex-wrap justify-between">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-800">{listing.title}</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {listing.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    ))}
                                </div>
                                <p className="text-l text-gray-500 mb-1">District: {listing.district}</p>
                                <p className="text-l text-gray-500 mb-1">Location: {listing.location}</p>
                                <p className="text-l text-gray-500 mb-1">Price: LKR{listing.price}</p>
                                <p className="text-l text-gray-500">Phone: {listing.phone}</p>
                                <p className="text-gray-600 mb-2 text-l line-clamp-3">Description: {listing.description}</p>
                            </div>
                            <div className="p-4 border-t border-gray-200 flex justify-end space-x-4">
                                <button
                                    onClick={() => openEditModal(listing.listingId)}
                                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => openDeleteModal(listing.listingId)}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                    disabled={isDeleting}
                                >
                                    <TrashIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Custom Confirmation Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Confirm Deletion"
                className="bg-white rounded-lg shadow-lg p-6 w-96 mx-auto"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            >
                <h2 className="text-xl font-semibold text-center">Are you sure you want to delete this listing?</h2>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={closeDeleteModal}
                        className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Listing"
                className="bg-white rounded-lg shadow-lg p-6 w-96 mx-auto"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            >
                <h2 className="text-xl font-semibold text-center">Edit Listing</h2>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={currentListingData?.title || ''}
                        onChange={(e) => setCurrentListingData({ ...currentListingData, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {/* Add additional fields for editing */}
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={closeEditModal}
                        className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default ListingsPage;
