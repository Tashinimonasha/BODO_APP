import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

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
                const response = await axios.get(`${apiUrl}/boarding/get-listings`);
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
        <div className="min-h-screen bg-gray-50">
            {/* Header with Title */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <div className="container mx-auto px-6 py-6">
                    <h1 className="text-2xl font-bold text-blue-900 tracking-tight">BOARDING LISTINGS</h1>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-6 py-5">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-72">
                                <label className="block text-blue-900 text-sm font-medium mb-2">Location</label>
                                <div className="relative">
                                    <select 
                                        onChange={handleDistrictChange} 
                                        value={selectedDistrict}
                                        className="w-full p-3 pl-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-700 text-sm appearance-none bg-white hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm"
                                    >
                                        {districts.map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-72">
                                <label className="block text-blue-900 text-sm font-medium mb-2">Price Range</label>
                                <div className="relative">
                                    <select 
                                        onChange={handleSortChange} 
                                        value={sortOrder}
                                        className="w-full p-3 pl-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-700 text-sm appearance-none bg-white hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm"
                                    >
                                        <option value="default">All Prices</option>
                                        <option value="lowToHigh">Low to High</option>
                                        <option value="highToLow">High to Low</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-96">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search by location or keywords..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full p-3 pl-11 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-700 text-sm bg-white hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm"
                                />
                                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="bg-gray-50">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.isArray(filteredData) && filteredData.length > 0 ? (
                            filteredData.map((listing) => (
                                <div
                                    key={listing.id}
                                    onClick={() => handleClick(listing.id)}
                                    className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100 cursor-pointer"
                                >
                                    <div className="relative">
                                        <img
                                            src={listing.images?.[0] || 'default-image-url.jpg'}
                                            alt={listing.title}
                                            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3 bg-green-600 bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm">
                                            Featured
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{listing.title}</h3>
                                        <p className="text-sm text-gray-500 mb-3 flex items-center">
                                            <svg className="w-4 h-4 mr-1.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            {listing.location}
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap gap-2">
                                                {listing.amenities?.map((amenity, index) => (
                                                    <span key={index} className="inline-flex items-center text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full">
                                                        • {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-baseline">
                                                <span className="text-lg font-bold text-blue-600">
                                                    LKR {listing.price?.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-gray-500 ml-1">/month</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                                <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">
                                                    {listing.district}
                                                </span>
                                                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500 text-lg">No listings found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Boarding;
