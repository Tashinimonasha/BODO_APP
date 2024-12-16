import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const dummyListings = [
    { id: 1, title: 'Spacious Apartment', location: 'Colombo', district: 'Western', price: 20000, image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Modern Villa', location: 'Gampaha', district: 'Western', price: 45000, image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Cozy Cottage', location: 'Kandy', district: 'Central', price: 15000, image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Luxury Apartment', location: 'Nugegoda', district: 'Western', price: 35000, image: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Budget Room', location: 'Jaffna', district: 'Northern', price: 10000, image: 'https://via.placeholder.com/150' },
    { id: 6, title: 'Seaside Villa', location: 'Matara', district: 'Southern', price: 50000, image: 'https://via.placeholder.com/150' },
];

const districts = ['All', 'Western', 'Central', 'Northern', 'Southern'];

const Boarding = () => {
    const navigate = useNavigate(); // For navigation
    const [listings, setListings] = useState(dummyListings);
    const [filteredData, setFilteredData] = useState(listings);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('All');
    const [sortOrder, setSortOrder] = useState('default');

    useEffect(() => {
        filterAndSortListings();
    }, [searchQuery, selectedDistrict, sortOrder]);

    const filterAndSortListings = () => {
        let filtered = listings;

        // Filter by district
        if (selectedDistrict !== 'All') {
            filtered = filtered.filter((listing) => listing.district === selectedDistrict);
        }

        // Filter by location (search)
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

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClick = (listingId) => {
        navigate(`/boarding/${listingId}`);
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4 text-center">
                <h1 className="text-3xl font-bold">Boarding Listings</h1>
            </header>

            {/* Filters */}
            <div className="container mx-auto p-6">
                <div className="flex flex-wrap items-center justify-between mb-6">

                    {/* District Filter */}
                    <div className="w-full md:w-1/3">
                        <label htmlFor="district" className="block font-medium text-gray-700 mb-2">
                            Filter by District
                        </label>
                        <select
                            id="district"
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Sort Filter */}
                    <div className="w-full md:w-1/3">
                        <label htmlFor="sortOrder" className="block font-medium text-gray-700 mb-2">
                            Sort by Price
                        </label>
                        <select
                            id="sortOrder"
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="default">Default</option>
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                        </select>
                    </div>

                    {/* Search Filter */}
                    <div className="w-full md:w-1/3">
                        <label htmlFor="search" className="block font-medium text-gray-700 mb-2">
                            Search by Location
                        </label>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by location"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Listings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredData.map((listing) => (
                        <div
                            key={listing.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                            onClick={() => handleClick(listing.id)}
                        >
                            <img src={listing.image} alt={listing.title} className="w-full h-40 object-cover"/>
                            <div className="p-4">
                                <h3 className="font-bold text-xl mb-2">{listing.title}</h3>
                                <p className="text-gray-600">{listing.location}</p>
                                <p className="text-blue-600 font-bold mt-2">LKR {listing.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="mt-6 text-center text-gray-500">
                        No listings found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Boarding;
