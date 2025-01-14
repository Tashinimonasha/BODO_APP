import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/outline';
const apiUrl = process.env.REACT_APP_API_URL;

const ListingCard = ({ listing, showDeleteButton }) => {
    const navigate = useNavigate();

    const handleViewListing = () => {
        navigate(`/boarding/${listing.id}`);
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
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-72 mb-4">
            <div className="mb-4">
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-40 object-cover rounded-md"
                />
            </div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <span className="text-green-600 font-bold">LKR{listing.price}</span>
            </div>
            <p className="text-sm text-gray-700 mb-4">
                {listing.description.length > 50
                    ? `${listing.description.substring(0, 50)}...`
                    : listing.description}
            </p>
            <div className="flex justify-between items-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                    onClick={handleViewListing}
                >
                    View Listing
                </button>
                {showDeleteButton && (
                    <button
                        className="mt-2 p-2 text-sm text-white bg-red-600 rounded hover:bg-red-500 transition"
                        onClick={handleDelete}
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListingCard;
