import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
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
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default PaymentHistory;
