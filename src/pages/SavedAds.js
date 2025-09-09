import React, { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import axios from 'axios';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
const apiUrl = process.env.REACT_APP_API_URL;

const SavedListingsPage = () => {
    const [savedListings, setSavedListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userData || !token) {
            setError("No user data or token found.");
            setLoading(false);
            return;
        }

        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.uid;

        const fetchSavedListings = async () => {
            try {
                const response = await axios.get(`${apiUrl}/boarding/saved/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSavedListings(response.data.data);
            } catch (err) {
                setError('Failed to fetch saved listings');
            } finally {
                setLoading(false);
            }
        };

        fetchSavedListings();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-pulse bg-white rounded-lg shadow-sm p-8 flex items-center space-x-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 bg-blue-200 rounded-full animate-pulse"></div>
                <div className="text-lg font-medium text-gray-600">Loading your saved properties...</div>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full hover:shadow-md transition-all duration-300">
                <div className="text-red-500 text-center mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Error Loading Saved Properties</h3>
                <p className="text-center text-red-600 hover:text-red-700 transition-colors duration-200">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="group cursor-default">
                        <h1 className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                            Saved Properties
                        </h1>
                        <p className="text-gray-600 mt-2 group-hover:text-blue-500 transition-colors duration-200">
                            {savedListings.length} {savedListings.length === 1 ? 'property' : 'properties'} saved
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => window.location.href='/boarding'}
                            className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 hover:shadow-md transform hover:scale-105 transition-all duration-200 ease-in-out"
                        >
                            <FaHeart className="mr-2" />
                            Find More
                        </button>
                    </div>
                </div>

                {savedListings.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md mx-auto hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
                        <FaHeart className="mx-auto text-4xl text-gray-300 mb-4 transform hover:scale-110 hover:text-pink-500 transition-all duration-300 ease-in-out" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">No saved properties yet</h2>
                        <p className="text-gray-600">Start saving properties to see them here!</p>
                        <button 
                            onClick={() => window.location.href='/boarding'}
                            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
                        >
                            Browse Properties
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {savedListings.map((listing) => (
                            <div key={listing.id} className="w-full max-w-sm transform hover:translate-y-[-8px] transition-all duration-300 ease-in-out">
                                <div className="hover:shadow-xl rounded-xl overflow-hidden">
                                    <ListingCard
                                        listing={listing}
                                        showDeleteButton={true}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedListingsPage;
