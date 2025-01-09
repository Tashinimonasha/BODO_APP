import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const districts = ['All', 'Galle', 'Matara', 'Colombo', 'Hambanthota', 'Kalutara', 'Kandy', 'Kegalle', 'Rathnapura', 'Gampaha', 'Anuradhapura', 'Polonnaruwa', 'Matale', 'Nuwara Eliya', 'Kurunegala', 'Puttalam', 'Trincomalee', 'Batticaloa', 'Ampara', 'Badulla', 'Monaragala', 'Hambanthota', 'Mullaitivu', 'Vavuniya', 'Kilinochchi', 'Jaffna'];

const Boarding = () => {
    const navigate = useNavigate(); // For navigation
    const [listings, setListings] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('All');
    const [sortOrder, setSortOrder] = useState('default');

    //Fetch boarding listings
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/boarding/get-listings');

                if (Array.isArray(response.data.data)) {
                    setListings(response.data.data);
                    setFilteredData(response.data.data);
                } else {
                    console.error('API response data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []);


    //Filtering part
    useEffect(() => {
        filterAndSortListings();
    }, [searchQuery, selectedDistrict, sortOrder]);

    const filterAndSortListings = () => {
        let filtered = Array.isArray(listings) ? [...listings] : [];

        // Filter by district
        if (selectedDistrict !== 'All') {
            filtered = filtered.filter((listing) => listing.district === selectedDistrict);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((listing) =>
                listing.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort by price
        if (sortOrder === 'lowToHigh') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'highToLow') {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredData(filtered);
    };

    const handleDistrictChange = (e) => setSelectedDistrict(e.target.value);
    const handleSortChange = (e) => setSortOrder(e.target.value);
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleClick = (listingId) => navigate(`/boarding/${listingId}`);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4 text-center">
                <h1 className="text-3xl font-bold">Boarding Listings</h1>
            </header>

            {/* Filters */}
            <div className="container mx-auto p-6">
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <select onChange={handleDistrictChange} value={selectedDistrict}>
                        {districts.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    <select onChange={handleSortChange} value={sortOrder}>
                        <option value="default">Default</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search by location"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.isArray(filteredData) && filteredData.length > 0 ? (
                        filteredData.map((listing) => (
                            <div
                                key={listing.id}
                                onClick={() => handleClick(listing.id)}
                                className="bg-white rounded-lg shadow-lg cursor-pointer"
                            >
                                <img
                                    src={listing.images?.[0] || 'default-image-url.jpg'}
                                    alt={listing.title}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold">{listing.title}</h3>
                                    <p className="text-gray-700">{listing.location}</p>
                                    <p className="text-blue-600 font-semibold">LKR {listing.price?.toLocaleString()}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No listings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Boarding;
