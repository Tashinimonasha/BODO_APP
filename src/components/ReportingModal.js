import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { FlagIcon, ExclamationIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

const ReportingModal = ({ isOpen, onClose, listingId, listingTitle }) => {
    const [reportData, setReportData] = useState({
        reportType: 'inappropriate_content',
        description: '',
        contactEmail: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reportTypes = [
        { value: 'inappropriate_content', label: 'Inappropriate Content' },
        { value: 'fake_listing', label: 'Fake Listing' },
        { value: 'scam', label: 'Scam/Suspicious' },
        { value: 'prohibited_items', label: 'Prohibited Items' },
        { value: 'contact_details_in_description', label: 'Contact Details in Description' },
        { value: 'duplicate_listing', label: 'Duplicate Listing' },
        { value: 'other', label: 'Other' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReportData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reportData.description.trim()) {
            toast.error('Please provide a description for your report');
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');

            const payload = {
                reportType: reportData.reportType,
                description: reportData.description,
                contactEmail: reportData.contactEmail || '',
            };

            await axios.post(`${apiUrl}/boarding/report/${listingId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            toast.success('Report submitted successfully. Thank you for helping us maintain a safe community.');
            setReportData({
                reportType: 'inappropriate_content',
                description: '',
                contactEmail: '',
            });
            onClose();
        } catch (error) {
            console.error('Failed to submit report:', error);
            toast.error(error.response?.data?.message || 'Failed to submit report. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-md sm:w-full z-10">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                    <XIcon className="h-6 w-6" />
                </button>

                {/* Modal Header */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100">
                    <div className="flex items-center">
                        <div className="text-4xl">🚩</div>
                        <h2 className="ml-3 text-lg font-bold text-red-700">Report Listing</h2>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                        Help us maintain a safe community. Please provide details about why you're reporting this listing.
                    </p>
                </div>

                {/* Modal Content */}
                <form onSubmit={handleSubmit} className="px-6 py-4">
                    {/* Listing Title Display */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                            Listing
                        </label>
                        <p className="text-sm text-gray-900 font-medium truncate">{listingTitle}</p>
                    </div>

                    {/* Report Type */}
                    <div className="mb-4">
                        <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">
                            Report Type *
                        </label>
                        <select
                            id="reportType"
                            name="reportType"
                            value={reportData.reportType}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                        >
                            {reportTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={reportData.description}
                            onChange={handleInputChange}
                            placeholder="Please provide details about why you're reporting this listing..."
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                            rows="4"
                            required
                        ></textarea>
                        <p className="mt-1 text-xs text-gray-500">
                            {reportData.description.length}/500
                        </p>
                    </div>

                    {/* Contact Email */}
                    <div className="mb-4">
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Email (Optional)
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={reportData.contactEmail}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            We'll use this to follow up on your report if needed
                        </p>
                    </div>

                    {/* Info Alert */}
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ExclamationIcon className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs text-yellow-700">
                                    False reports may result in restrictions on your account. Reports are reviewed by our team.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportingModal;
