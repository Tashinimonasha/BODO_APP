import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const BoardingDetailsPage = () => {
    const { boardingId } = useParams(); // Get the boardingId from the URL params
    const [boardingDetails, setBoardingDetails] = useState(null);
    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false); // Track saved state
    const [rating, setRating] = useState(0); // Track selected rating
    const navigate = useNavigate();

    // Fetch boarding details based on boardingId
    useEffect(() => {
        const fetchBoardingDetails = async () => {
            try {
                const response = await axios.get(`/api/boarding/${boardingId}`);
                setBoardingDetails(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching boarding details:", error);
                setIsLoading(false);
            }
        };

        fetchBoardingDetails();
    }, [boardingId]);

    // Handle review submission
    const handleReviewSubmit = async () => {
        try {
            // Assuming you're sending the review to an API endpoint
            await axios.post(`/api/boarding/${boardingId}/review`, { review, rating });
            setReview(''); // Clear the review input after submission
            setRating(0); // Clear the rating after submission
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    // Handle save (heart icon toggle)
    const handleSaveToggle = () => {
        setIsSaved((prevState) => !prevState);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center">
            <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full"
                role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
            ; // You can replace this with a spinner if desired
    }

    if (!boardingDetails) {
        return <p className="text-center text-lg">No details found for this boarding.</p>;
    }

    return (
        <div className="flex justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                {/* Image Carousel */}
                <div className="relative">
                    <img
                        src={boardingDetails.images[0]}
                        alt="Boarding"
                        className="w-full h-80 object-cover rounded-lg"
                    />
                    {/* Save Button (Heart Icon) */}
                    <div
                        onClick={handleSaveToggle}
                        className={`absolute top-4 right-4 cursor-pointer ${isSaved ? 'text-red-500' : 'text-gray-400'}`}
                    >
                        {isSaved ? <FaHeart size={30} /> : <FaRegHeart size={30} />}
                    </div>
                </div>

                {/* Boarding Details */}
                <h2 className="text-2xl font-bold mb-4 mt-4">{boardingDetails.title}</h2>
                <p className="mb-2"><strong>Description:</strong> {boardingDetails.description}</p>
                <p className="mb-2"><strong>Location:</strong> {boardingDetails.location}</p>
                <p className="mb-2"><strong>Price:</strong> LKR {boardingDetails.price}</p>
                <p className="mb-2"><strong>Availability:</strong> {boardingDetails.available ? 'Available' : 'Not Available'}</p>
                <p className="mb-4"><strong>Rating:</strong> {boardingDetails.rating} / 5</p>

                {/* Star Rating */}
                <div className="flex items-center mb-4">
                    <strong>Your Rating:</strong>
                    <div className="flex ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                className="cursor-pointer"
                                onClick={() => setRating(star)}
                            >
                                {rating >= star ? (
                                    <AiFillStar size={24} className="text-yellow-400" />
                                ) : (
                                    <AiOutlineStar size={24} className="text-gray-400" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add a Review */}
                <h3 className="text-xl font-semibold mt-6 mb-2">Add a Review</h3>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    placeholder="Write your review here"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                />
                <button
                    onClick={handleReviewSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default BoardingDetailsPage;
