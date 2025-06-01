import React from 'react';
import Sidebar from '../components/SideBar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const AdminDashboard = () => {
  const listingCount = 25;
  const userCount = 12;

  const chartData = [
    { month: 'Jan', listings: 4, users: 2 },
    { month: 'Feb', listings: 6, users: 3 },
    { month: 'Mar', listings: 5, users: 4 },
    { month: 'Apr', listings: 7, users: 5 },
    { month: 'May', listings: 3, users: 3 },
    { month: 'Jun', listings: 8, users: 6 },
  ];

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
        <main className="p-6 flex flex-col gap-8 items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-gray-600 text-center max-w-xl">
            Use the sidebar to manage listings and users.
          </p>

          {/* Stats Cards */}
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
              <div className="bg-white shadow rounded p-6 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-blue-600">{listingCount}</h3>
                <p className="text-gray-500 mt-1">Total Listings</p>
              </div>
              <div className="bg-white shadow rounded p-6 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-green-600">{userCount}</h3>
                <p className="text-gray-500 mt-1">Total Users</p>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex justify-center w-full">
            <div className="bg-white shadow rounded p-6 max-w-4xl w-full">
              <h3 className="text-xl font-semibold mb-4 text-center">Monthly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="listings" fill="#3b82f6" name="Listings" />
                  <Bar dataKey="users" fill="#10b981" name="Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
