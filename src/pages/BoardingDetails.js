import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaArrowLeft, FaTimes } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = process.env.REACT_APP_API_URL;

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
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
                const response = await axios.get(`${apiUrl}/boarding/get-listing/${boardingId}`);
                setBoardingDetails(response.data.data); // Set details to data
                setIsSaved(response.data.data.isSaved);
                setIsLoading(false);

                // Fetch reviews for this boarding
                const reviewsResponse = await axios.get(`${apiUrl}/review/get-reviews/${boardingId}`);
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
                `${apiUrl}/boarding/submit-review/${boardingId}`,
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
            const updatedReviewsResponse = await axios.get(`${apiUrl}/review/get-reviews/${boardingId}`);
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
                `${apiUrl}/boarding/save/${boardingId}`,
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

    // ** Handle Payment Button Click **
    const handlePaymentClick = () => {
        if (!user) {
            toast.error('You must be logged in to make a payment.');
            navigate('/login');
            return;
        }
        setIsPaymentModalOpen(true);
    };

    // ** Handle Payment Details Change **
    const handlePaymentDetailsChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ** Handle Payment Verification **
    const handleVerifyPayment = async () => {
        // Validate payment details
        if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.expiryDate || !paymentDetails.cvv) {
            toast.error('Please fill in all payment details.');
            return;
        }

        setIsProcessingPayment(true);
        const token = localStorage.getItem('token');

        try {
            // Call payment create API
            await axios.post(
                `${apiUrl}/payment/create`,
                {
                    boardingId: boardingId,
                    amount: boardingDetails.price
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Close payment modal
            setIsPaymentModalOpen(false);
            
            // Reset payment details
            setPaymentDetails({
                cardNumber: '',
                cardName: '',
                expiryDate: '',
                cvv: ''
            });

            // Show success popup
            setShowSuccessPopup(true);

            // Auto close success popup after 3 seconds
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000);

        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setIsProcessingPayment(false);
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
            {/* Back Button */}
            <button 
                onClick={() => navigate('/boarding')}
                className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
                <FaArrowLeft className="mr-2" />
                <span>Back to Listings</span>
            </button>

            {/* Image Carousel Section */}
            {boardingDetails?.images && boardingDetails.images.length > 0 ? (
                <div className="relative">
                    <div className="flex justify-center mb-4">
                        <img
                            src={boardingDetails.images[currentImageIndex]}
                            alt={`Boarding Image ${currentImageIndex + 1}`}
                            className="w-100 h-60 object-cover rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                            onClick={() => setIsImageModalOpen(true)}
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

                    {/* Image Modal */}
                    {isImageModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" onClick={() => setIsImageModalOpen(false)}>
                            <div className="relative w-[95vw] h-[95vh] flex items-center justify-center">
                                <button 
                                    className="absolute top-2 right-2 text-white hover:text-gray-300 z-50 bg-black bg-opacity-50 rounded-full p-2"
                                    onClick={() => setIsImageModalOpen(false)}
                                >
                                    <FaTimes size={24} />
                                </button>
                                
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <button 
                                        className="absolute left-2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-4 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                    >
                                        &#10094;
                                    </button>
                                    
                                    <img
                                        src={boardingDetails.images[currentImageIndex]}
                                        alt={`Boarding Image ${currentImageIndex + 1}`}
                                        className="max-w-full max-h-full w-auto h-auto object-contain"
                                        style={{ minHeight: '80vh' }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    
                                    <button 
                                        className="absolute right-2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-4 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                    >
                                        &#10095;
                                    </button>
                                </div>

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
                                    {currentImageIndex + 1} / {boardingDetails.images.length}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>No images available</p>
            )}

            {/* Save and Like Button */}
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-semibold">{boardingDetails.title}</h2>
                    {boardingDetails.isAvailable === true ? (
                        <span className="bg-green-600 bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm ml-2">
                            Available
                        </span>
                    ) : (
                        <span className="bg-red-600 bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm ml-2">
                            Not Available
                        </span>
                    )}
                    {boardingDetails.isReleased === true && (
                        <span className="bg-red-200 bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-red-800 shadow-sm ml-2">
                            Released Soon
                        </span>
                    )}
                </div>
                <div onClick={handleSaveToggle} className="cursor-pointer">
                    {isSaved ? <FaHeart size={30} className="text-red-600" /> : <FaRegHeart size={30} />}
                </div>
            </div>

        {/* Boarding Details */}
        <div className="mt-4 space-y-2">
        <p className="text-lg">Description: <span className="text-blue-600 font-semibold">{boardingDetails.description}</span></p>
         <p className="text-lg">Location: <span className="text-blue-600 font-semibold">{boardingDetails.location}</span></p>
         <p className="text-lg">Price: <span className="text-blue-600 font-semibold">LKR {boardingDetails.price}</span></p>
         <p className="text-lg">District: <span className="text-blue-600 font-semibold">{boardingDetails.district}</span></p>
         <p className="text-lg">Type: <span className="text-blue-600 font-semibold">{boardingDetails.type}</span></p>
    
        {/* Contact Section with a Square Box */}
        <div className="mt-4 p-4 border-2 border-green-500 rounded-lg w-fit flex items-center space-x-2 bg-green-100">
        <span className="text-xl">📞</span>
        <p className="text-green-500 font-semibold">Contact: <span className="text-black font-semibold">{boardingDetails.phone}</span></p>
        </div>

        {/* Payment Button */}
        <div className="mt-6">
            <button
                onClick={handlePaymentClick}
                disabled={!boardingDetails.isAvailable}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                    boardingDetails.isAvailable 
                        ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                        : 'bg-gray-400 cursor-not-allowed opacity-60'
                }`}
            >
                Pay
            </button>
            {!boardingDetails.isAvailable && (
                <p className="text-red-500 text-sm mt-2">Payment is only available when the boarding is available.</p>
            )}
        </div>
</div>
            {/* Overall Rating Section */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                    <h2 className="text-4xl font-bold text-orange-500">
                        {reviews.length > 0 
                            ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
                            : "0.0"}
                    </h2>
                    <div className="ml-4">
                        <div className="flex text-orange-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <AiFillStar key={star} size={24} />
                            ))}
                        </div>
                        <p className="text-gray-600">{reviews.length} reviews</p>
                    </div>
                    <button 
                        onClick={() => document.getElementById('writeReview').scrollIntoView({ behavior: 'smooth' })}
                        className="ml-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Write a review
                    </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                                        {review.userName?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-4 flex-grow">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold">{review.userName}</h3>
                                            <span className="text-gray-500 text-sm">
                                                {new Date(review.createdAt._seconds * 1000).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex text-orange-500 my-1">
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
                                        <p className="text-gray-700 mt-2">{review.comment}</p>
                                        <div className="flex items-center mt-3 space-x-4">
                                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                                                Reply
                                            </button>
                                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                                                Helpful?
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No reviews available.</p>
                    )}
                </div>
            </div>

            {/* Write Review Section */}
            <div id="writeReview" className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Leave a Review</h3>
                <div className="flex items-center mb-4">
                    <p className="mr-4">Rating:</p>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                                key={star} 
                                onClick={() => setRating(star)} 
                                className="cursor-pointer text-2xl"
                            >
                                {rating >= star ? (
                                    <AiFillStar className="text-orange-500" size={28} />
                                ) : (
                                    <AiOutlineStar className="text-orange-500" size={28} />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="4"
                />
                <button
                    onClick={handleReviewSubmit}
                    className="mt-4 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Submit Review
                </button>
            </div>
            
            {/* Payment Gateway Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsPaymentModalOpen(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsPaymentModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Secure Your Booking</h2>
                                <p className="text-blue-600 text-sm font-medium">You're almost there!</p>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="mt-6 mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Payment Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <span>Advance Payment</span>
                                    <span className="font-semibold">LKR {(Number(boardingDetails.price) / 2).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Key Money Deposit</span>
                                    <span className="font-semibold">LKR {(Number(boardingDetails.price) / 2).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-900 font-bold text-lg pt-2 border-t border-gray-300">
                                    <span>Total Due Now:</span>
                                    <span>LKR {Number(boardingDetails.price).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment Method Icons */}
                            <div className="flex items-center gap-2 mt-3 justify-end">
                                <div className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded">VISA</div>
                                <div className="px-3 py-1.5 bg-blue-500 text-white font-bold text-xs rounded flex items-center">
                                    <span className="text-lg">💳</span>
                                </div>
                                <div className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded">P</div>
                                <div className="px-3 py-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold text-xs rounded flex items-center gap-0.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 -ml-1.5"></div>
                                </div>
                                <div className="px-3 py-1.5 bg-gray-600 text-white font-bold text-xs rounded">🏦</div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Payment Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentDetailsChange}
                                    placeholder="Card Number"
                                    maxLength="19"
                                    className="col-span-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                <input
                                    type="text"
                                    name="cardName"
                                    value={paymentDetails.cardName}
                                    onChange={handlePaymentDetailsChange}
                                    placeholder="Cardholder Name"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={paymentDetails.expiryDate}
                                    onChange={handlePaymentDetailsChange}
                                    placeholder="Expiry Date (MM/YY)"
                                    maxLength="5"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    value={paymentDetails.cvv}
                                    onChange={handlePaymentDetailsChange}
                                    placeholder="CVV"
                                    maxLength="3"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="mb-6 bg-gray-50 p-4 rounded-md">
                            <h3 className="text-base font-bold text-gray-800 mb-2">Terms & Conditions</h3>
                            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                                <li>This is non-refundable advance payment and key money deposit.</li>
                                <li>Secures your booking for days.</li>
                                <li>Remaining balance of LKR 40,000.00 due upon move-in.</li>
                                <li>By clicking <span className="text-blue-600 font-medium">'BODO APP's Terms of Service and Refund Policy'</span></li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsPaymentModalOpen(false)}
                                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleVerifyPayment}
                                disabled={isProcessingPayment}
                                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                                    isProcessingPayment 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isProcessingPayment ? 'Processing...' : 'Confirm Payment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm mx-4 text-center animate-bounce">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                        <p className="text-gray-600">Your payment has been processed successfully.</p>
                    </div>
                </div>
            )}

            {/* ToastContainer displaying notifications */}
            <ToastContainer />
        </div>
    );
};

export default BoardingDetailsPage;
