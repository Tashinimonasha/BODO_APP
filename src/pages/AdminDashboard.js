import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_URL;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ** Fetch dashboard data **
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/user/dashboard`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Error fetching dashboard data');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    // Handle invalid or extremely large numbers
    if (!amount || isNaN(amount) || !isFinite(amount)) {
      return 'N/A';
    }

    // Cap the value at a reasonable maximum (e.g., 100 million)
    const cappedAmount = Math.min(amount, 100000000);

    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(cappedAmount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-medium">Error loading dashboard: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const summary = dashboardData.summary || {};
  const districtData = Object.entries(dashboardData.listingsByDistrict || {}).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              👤 Logged in as <strong className="text-purple-600">Admin</strong>
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600">System Overview and Analytics</p>
          </div>

          {/* Main Stats Cards - Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <h3 className="text-3xl font-bold text-gray-800">{summary.totalUsers}</h3>
                </div>
                <div className="text-4xl text-blue-500">👥</div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Listings</p>
                  <h3 className="text-3xl font-bold text-gray-800">{summary.totalListings}</h3>
                </div>
                <div className="text-4xl text-green-500">🏠</div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Available Listings</p>
                  <h3 className="text-3xl font-bold text-gray-800">{summary.availableListings}</h3>
                </div>
                <div className="text-4xl text-purple-500">✓</div>
              </div>
            </div>
          </div>

          {/* Secondary Stats Cards - Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Reviews</p>
                  <h3 className="text-3xl font-bold text-gray-800">{summary.totalReviews}</h3>
                </div>
                <div className="text-4xl text-yellow-500">⭐</div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Payments</p>
                  <h3 className="text-3xl font-bold text-gray-800">{summary.totalPayments}</h3>
                </div>
                <div className="text-4xl text-red-500">💳</div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <h3 className="text-xl font-bold text-gray-800">{formatCurrency(summary.totalRevenue)}</h3>
                </div>
                <div className="text-4xl text-indigo-500">💰</div>
              </div>
            </div>
          </div>

          {/* Average Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Average Price per Listing</p>
                  <h3 className="text-2xl font-bold text-gray-800 truncate">
                    {summary.averagePrice ? formatCurrency(summary.averagePrice) : 'N/A'}
                  </h3>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Average Rating</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-gray-800">{summary.averageRating}/5</h3>
                    <span className="text-yellow-400">⭐</span>
                  </div>
                </div>
                <div className="text-4xl">📈</div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* District Distribution Chart */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Listings by District</h3>
              {districtData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={districtData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {districtData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">No district data available</p>
              )}
            </div>

            {/* Summary Table */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">District Breakdown</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {districtData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between pb-3 border-b">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-gray-700 font-medium">{item.name}</span>
                    </div>
                    <span className="text-gray-800 font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Rated Listings */}
          {dashboardData.topRatedListings && dashboardData.topRatedListings.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Top Rated Listings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">Title</th>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">District</th>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">Price</th>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">Rating</th>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">Reviews</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.topRatedListings.slice(0, 5).map((listing) => (
                      <tr key={listing.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800 font-medium">{listing.title}</td>
                        <td className="px-4 py-3 text-gray-600">{listing.district}</td>
                        <td className="px-4 py-3 text-gray-800">{formatCurrency(listing.price)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-gray-800 font-semibold">{listing.averageRating}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{listing.reviewCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recent Listings */}
          {dashboardData.recentListings && dashboardData.recentListings.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Listings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.recentListings.slice(0, 6).map((listing) => (
                  <div key={listing.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                    <h4 className="font-semibold text-gray-800 mb-2">{listing.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{listing.district}</p>
                    <p className="text-lg font-bold text-blue-600 mb-2">{formatCurrency(listing.price)}</p>
                    <p className="text-xs text-gray-500">{formatDate(listing.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Reviews */}
          {dashboardData.recentReviews && dashboardData.recentReviews.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Reviews</h3>
              <div className="space-y-4">
                {dashboardData.recentReviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="border-l-4 border-yellow-400 pl-4 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-gray-800">{review.email}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {review.rating >= star ? (
                              <AiFillStar className="text-yellow-400" size={16} />
                            ) : (
                              <AiOutlineStar className="text-yellow-400" size={16} />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;
