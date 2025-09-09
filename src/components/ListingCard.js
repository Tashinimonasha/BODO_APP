import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TrashIcon, XIcon } from '@heroicons/react/outline';
import { ExclamationIcon } from '@heroicons/react/solid';
const apiUrl = process.env.REACT_APP_API_URL;

const ListingCard = ({ listing, showDeleteButton }) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleViewListing = () => {
        navigate(`/boarding/${listing.id}`);
    };

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`${apiUrl}/boarding/delete/${listing.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete listing:', error);
        } finally {
            setShowDeleteModal(false);
        }
    };

    return (
        <>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                    <img
                        src={listing.images && listing.images.length > 0 ? listing.images[0] : '/placeholder.jpg'}
                        alt={listing.title}
                        className="w-full h-48 object-cover"
                    />
                    {showDeleteButton && (
                        <button
                            onClick={openDeleteModal}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex flex-col items-start">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{listing.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {listing.description}
                        </p>
                        <div className="flex items-center justify-between w-full">
                            <span className="text-lg font-bold text-green-600">
                                LKR {listing.price}
                            </span>
                            <button
                                onClick={handleViewListing}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                            >
                                View Listing
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeDeleteModal}></div>

                        <div className="relative inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    onClick={closeDeleteModal}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <XIcon className="h-6 w-6" />
                                </button>
                            </div>
                            
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationIcon className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg font-medium text-gray-900">Delete Saved Item</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this saved item? This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={closeDeleteModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ListingCard;
