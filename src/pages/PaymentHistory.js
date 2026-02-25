import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_URL;

const PaymentHistory = () => {
    const { boardingId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const boardingTitle = location.state?.boardingTitle || 'Boarding';
    
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPayments, setTotalPayments] = useState(0);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [reviewData, setReviewData] = useState({
        comment: '',
        rating: 0
    });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [isViewReviewsModalOpen, setIsViewReviewsModalOpen] = useState(false);
    const [userReviews, setUserReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [selectedUserForReviews, setSelectedUserForReviews] = useState(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error("No token found, please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${apiUrl}/payment/boarding/${boardingId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPayments(response.data.data || []);
                setTotalPayments(response.data.count || 0);
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching payment history');
                toast.error(error.response?.data?.message || 'Error fetching payment history');
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [boardingId]);

    const formatDate = (dateString) => {
        let date;
        
        // Check if dateString is a Firestore timestamp object
        if (dateString && typeof dateString === 'object' && '_seconds' in dateString) {
            // Convert Firestore timestamp to JavaScript Date
            date = new Date(dateString._seconds * 1000);
        } else {
            date = new Date(dateString);
        }
        
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const getTotalAmount = () => {
        return payments.reduce((sum, payment) => sum + payment.amount, 0);
    };

    // ** Get the latest payment for each user **
    const getLatestPaymentPerUser = () => {
        const latestPerUser = {};
        payments.forEach(payment => {
            const email = payment.paymentDoneByEmail;
            if (!latestPerUser[email] || new Date(latestPerUser[email].paidDate) < new Date(payment.paidDate)) {
                latestPerUser[email] = payment;
            }
        });
        return Object.values(latestPerUser).map(p => p.id);
    };

    const isLatestPaymentForUser = (paymentId) => {
        return getLatestPaymentPerUser().includes(paymentId);
    };

    // ** Handle Review Button Click **
    const handleReviewClick = (payment) => {
        setSelectedPayment(payment);
        setReviewData({ comment: '', rating: 0 });
        setIsReviewModalOpen(true);
    };

    // ** Handle Review Submission **
    const handleSubmitReview = async () => {
        if (!reviewData.comment.trim() || reviewData.rating === 0) {
            toast.error('Please fill in comment and rating.');
            return;
        }

        setIsSubmittingReview(true);
        const token = localStorage.getItem('token');

        try {
            await axios.post(
                `${apiUrl}/review/add-review`,
                {
                    email: selectedPayment.paymentDoneByEmail,
                    comment: reviewData.comment,
                    rating: reviewData.rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Review submitted successfully!');
            setIsReviewModalOpen(false);
            setReviewData({ comment: '', rating: 0 });
            setSelectedPayment(null);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error(error.response?.data?.message || 'Error submitting review');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    // ** Handle Rating Change **
    const handleRatingChange = (newRating) => {
        setReviewData(prev => ({ ...prev, rating: newRating }));
    };

    // ** Handle View Reviews Button Click **
    const handleViewReviewsClick = async (payment) => {
        setSelectedUserForReviews(payment.paymentDoneByEmail);
        setLoadingReviews(true);
        setIsViewReviewsModalOpen(true);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(
                `${apiUrl}/review/get-user-reviews/${payment.paymentDoneByEmail}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUserReviews(response.data.reviews || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            toast.error(error.response?.data?.message || 'Error fetching reviews');
            setUserReviews([]);
        } finally {
            setLoadingReviews(false);
        }
    };

    // ** Format Date **
    const formatReviewDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading payment history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="w-full mx-auto px-2 sm:px-4 lg:px-6">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to My Ads
                    </button>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment History</h1>
                                <p className="text-lg text-gray-600">{boardingTitle}</p>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-center px-6 py-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-sm font-medium text-blue-600">Total Payments</p>
                                    <p className="text-2xl font-bold text-blue-700">{totalPayments}</p>
                                </div>
                                <div className="text-center px-6 py-3 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-medium text-green-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-green-700">{formatCurrency(getTotalAmount())}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payments Table */}
                {error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                ) : payments.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Payment History</h3>
                        <p className="text-gray-500">No payments have been made for this boarding yet.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-full">
                        <div className="w-full">
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Payment ID
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Paid By
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Payment Date
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {payments.map((payment, index) => (
                                        <tr 
                                            key={payment.id} 
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            #{payment.id.substring(0, 8)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 font-medium">{payment.paymentDoneByEmail}</div>
                                                <div className="text-xs text-gray-500">ID: {payment.paymentDoneBy.substring(0, 10)}...</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-green-600">
                                                    {formatCurrency(payment.amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {formatDate(payment.paidDate)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                    payment.status === 'completed' 
                                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                                        : payment.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                        : 'bg-red-100 text-red-800 border border-red-200'
                                                }`}>
                                                    <span className={`h-2 w-2 rounded-full mr-2 ${
                                                        payment.status === 'completed' 
                                                            ? 'bg-green-500' 
                                                            : payment.status === 'pending'
                                                            ? 'bg-yellow-500'
                                                            : 'bg-red-500'
                                                    }`}></span>
                                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {isLatestPaymentForUser(payment.id) && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleReviewClick(payment)}
                                                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-3l-4 4z" />
                                                            </svg>
                                                            Add Review
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewReviewsClick(payment)}
                                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            View Reviews
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Summary Cards */}
                {payments.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Average Payment</p>
                                    <p className="text-xl font-bold text-gray-900">{formatCurrency(getTotalAmount() / totalPayments)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Completed Payments</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {payments.filter(p => p.status === 'completed').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Last Payment</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {payments.length > 0 ? formatDate(payments[0].paidDate) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Review Modal */}
            {isReviewModalOpen && selectedPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative">
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsReviewModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add Your Review</h2>
                            <p className="text-gray-600 mt-2">Share your experience about this boarding</p>
                        </div>

                        {/* Rating Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-800 mb-3">Rating</label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => handleRatingChange(star)}
                                        className="focus:outline-none transition-transform transform hover:scale-110"
                                    >
                                        {reviewData.rating >= star ? (
                                            <AiFillStar className="text-yellow-400" size={32} />
                                        ) : (
                                            <AiOutlineStar className="text-yellow-400" size={32} />
                                        )}
                                    </button>
                                ))}
                            </div>
                            {reviewData.rating > 0 && (
                                <p className="text-sm text-gray-600 mt-2">You rated: {reviewData.rating} out of 5 stars</p>
                            )}
                        </div>

                        {/* Comment Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-800 mb-3">Your Comment</label>
                            <textarea
                                value={reviewData.comment}
                                onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                                placeholder="Share your thoughts about this boarding..."
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                rows="5"
                            />
                            <p className="text-xs text-gray-500 mt-2">{reviewData.comment.length} / 500 characters</p>
                        </div>

                        {/* User Info Display */}
                        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Reviewing as:</span> {selectedPayment.paymentDoneByEmail}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsReviewModalOpen(false)}
                                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                disabled={isSubmittingReview}
                                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                                    isSubmittingReview 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-purple-600 hover:bg-purple-700'
                                }`}
                            >
                                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Reviews Modal */}
            {isViewReviewsModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsViewReviewsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">User Reviews</h2>
                            <p className="text-gray-600 mt-2">{selectedUserForReviews}</p>
                        </div>

                        {/* Loading State */}
                        {loadingReviews && (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        )}

                        {/* Reviews List */}
                        {!loadingReviews && (
                            <>
                                {userReviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {userReviews.map((review, index) => (
                                            <div key={review.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                {/* Review Header */}
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        {/* Star Rating */}
                                                        <div className="flex text-yellow-400">
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
                                                        <span className="text-sm font-bold text-gray-700 ml-2">{review.rating}/5</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        {formatReviewDate(review.createdAt)}
                                                    </span>
                                                </div>

                                                {/* Review Comment */}
                                                <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                        <p className="text-gray-500 font-medium">No reviews available</p>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Review Summary */}
                        {!loadingReviews && userReviews.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Average Rating</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {(userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1)}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Total Reviews</p>
                                        <p className="text-2xl font-bold text-gray-900">{userReviews.length}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Close Button */}
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => setIsViewReviewsModalOpen(false)}
                                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default PaymentHistory;
