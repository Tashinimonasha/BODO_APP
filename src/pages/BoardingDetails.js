import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BoardingDetailsPage = () => {
    const { boardingId } = useParams();
    const navigate = useNavigate();
    const [boardingDetails, setBoardingDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comment, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // ** Check if user is logged in **
    useEffect(() => {
        const checkUserAuthentication = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        checkUserAuthentication();
    }, []);

    // ** Fetch boarding details and reviews **
    useEffect(() => {
        const fetchBoardingDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/boarding/get-listing/${boardingId}`);
                setBoardingDetails(response.data.data); // Set details to data
                setIsSaved(response.data.data.isSaved);
                setIsLoading(false);

                // Fetch reviews for this boarding
                const reviewsResponse = await axios.get(`http://localhost:3000/api/review/get-reviews/${boardingId}`);
                setReviews(reviewsResponse.data); // Set reviews data
            } catch (error) {
                console.error('Error fetching boarding details:', error);
                setIsLoading(false);
            }
        };

        fetchBoardingDetails();
    }, [boardingId]);

    // ** Check user is authenticated before submitting review **
    const handleReviewSubmit = async () => {
        if (!user) {
            toast.error('You must be logged in to submit a review.');
            navigate('/login');
            return;
        }

        const token = localStorage.getItem('token');

        try {
            await axios.post(
                `http://localhost:3000/api/boarding/submit-review/${boardingId}`,
                {
                    comment,
                    rating,
                    listingId: boardingId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Review submitted successfully!');
            setReview('');
            setRating(0);

            // Fetch the updated reviews
            const updatedReviewsResponse = await axios.get(`http://localhost:3000/api/review/get-reviews/${boardingId}`);
            setReviews(updatedReviewsResponse.data);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Please rate before Submitting.');
        }
    };

    // ** Check user is authenticated before saving a listing **
    const handleSaveToggle = async () => {
        if (!user) {
            toast.error('You must be logged in to save a boarding.');
            navigate('/login');
            return;
        }

        const token = localStorage.getItem('token');

        try {
            await axios.post(
                `http://localhost:3000/api/boarding/save/${boardingId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIsSaved((prevState) => !prevState);
            toast.success(isSaved ? 'Boarding removed from saved list.' : 'Boarding saved successfully!');
        } catch (error) {
            console.error('Error saving boarding:', error);
            toast.error('Boarding Already Saved!');
        }
    };

    // ** Image Navigation **
    const nextImage = () => {
        if (boardingDetails?.images?.length) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === boardingDetails.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const prevImage = () => {
        if (boardingDetails?.images?.length) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? boardingDetails.images.length - 1 : prevIndex - 1
            );
        }
    };

    if (isLoading) return <p className="text-center text-xl">Loading...</p>;
    if (!boardingDetails) return <p className="text-center text-xl">No details found for this boarding.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Image Carousel Section */}
            {boardingDetails?.images && boardingDetails.images.length > 0 ? (
                <div className="relative">
                    <div className="flex justify-center mb-4">
                        <img
                            src={boardingDetails.images[currentImageIndex]}
                            alt={`Boarding Image ${currentImageIndex + 1}`}
                            className="w-100 h-60 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer" onClick={prevImage}>
                        <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                            &#10094;
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer" onClick={nextImage}>
                        <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                            &#10095;
                        </button>
                    </div>
                </div>
            ) : (
                <p>No images available</p>
            )}

            {/* Save and Like Button */}
            <div className="flex items-center justify-between mt-4">
                <h2 className="text-3xl font-semibold">{boardingDetails.title}</h2>
                <div onClick={handleSaveToggle} className="cursor-pointer">
                    {isSaved ? <FaHeart size={30} className="text-red-600" /> : <FaRegHeart size={30} />}
                </div>
            </div>

            {/* Boarding Details */}
            <div className="mt-4 space-y-2">
                <p className="text-lg">Description: {boardingDetails.description}</p>
                <p className="text-lg">Location: {boardingDetails.location}</p>
                <p className="text-lg">Price: LKR {boardingDetails.price}</p>
                <p className="text-lg">District: {boardingDetails.district}</p>
                <p className="text-lg">Type: {boardingDetails.type}</p>
            </div>

            {/* Review Section */}
            <div className="mt-8 p-6 border-t-2 border-gray-200">
                <h3 className="text-2xl font-semibold">Leave a Review</h3>
                <textarea
                    value={comment}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                />
                <div className="flex space-x-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => setRating(star)} className="cursor-pointer text-yellow-500">
                            {rating >= star ? <AiFillStar size={24} /> : <AiOutlineStar size={24} />}
                        </span>
                    ))}
                </div>
                <button
                    onClick={handleReviewSubmit}
                    className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Submit Review
                </button>
            </div>

            {/*//Reviews Section*/}
            <div className="mt-8 p-6 border-t-2 border-gray-200">
                <h3 className="text-2xl font-semibold">Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="mt-4 border-t-2 border-gray-200 pt-4">
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-semibold text-gray-700">{review.userName}</div>
                                <div className="flex items-center text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star}>
                                {review.rating >= star ? (
                                    <AiFillStar size={18} />
                                ) : (
                                    <AiOutlineStar size={18} />
                                )}
                            </span>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-2 text-lg text-gray-700">{review.comment}</p>
                            <p className="mt-2 text-sm text-gray-500">
                                {new Date(review.createdAt._seconds * 1000).toLocaleString()} {/* Format the createdAt */}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
            {/* ToastContainer displaying notifications */}
            <ToastContainer />
        </div>
    );
};

export default BoardingDetailsPage;
