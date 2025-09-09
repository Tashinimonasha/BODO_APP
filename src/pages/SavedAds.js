import React, { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const SavedListingsPage = () => {
    const [savedListings, setSavedListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedListings = async () => {
            try {
                const userData = localStorage.getItem('user');
                const token = localStorage.getItem('token');

                if (!userData || !token) {
                    setError("Please log in to view saved listings");
                    setLoading(false);
                    return;
                }

                const parsedUserData = JSON.parse(userData);
                const userId = parsedUserData.uid;

                const response = await axios.get(`${apiUrl}/boarding/saved/${userId}`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.data && response.data.data) {
                    setSavedListings(response.data.data);
                } else {
                    setSavedListings([]);
                }
            } catch (err) {
                console.error('Error details:', err.response || err);
                if (err.response && err.response.status === 401) {
                    setError('Your session has expired. Please log in again.');
                    // Clear invalid token
                    localStorage.removeItem('token');
                    // Optionally redirect to login
                    window.location.href = '/login';
                } else {
                    setError('Failed to fetch saved listings. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSavedListings();
    }, []);

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-xl font-medium text-center mb-6">Saved Listings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {savedListings.length === 0 ? (
                    <p className="text-center text-gray-600 col-span-full">No saved listings found.</p>
                ) : (
                    savedListings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                            showDeleteButton={true}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default SavedListingsPage;
