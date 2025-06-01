import React, { useState } from 'react';
import { FaTrashAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();

  const dummyUsers = [
    {
      _id: '1',
      name: 'Shanaka Perera',
      email: 'shanaka123@example.com',
    },
    {
      _id: '2',
      name: 'Nimal Silva',
      email: 'nimal456@example.com',
    },
    {
      _id: '3',
      name: 'Sanduni Gunasekara',
      email: 'sanduni_g@example.com',
    },
    {
      _id: '4',
      name: 'Kasun Madushanka',
      email: 'kasun_m@example.com',
    },
    {
      _id: '5',
      name: 'Anusha Wickramasinghe',
      email: 'anusha98@example.com',
    },
  ];

  const [users, setUsers] = useState(dummyUsers);
  const [searchName, setSearchName] = useState('');

  const filtered = users.filter((user) =>
    user.name?.toLowerCase().includes(searchName.toLowerCase())
  );

  const deleteUser = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      const updated = users.filter((u) => u._id !== id);
      setUsers(updated);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="mb-6 inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold bg-purple-100 px-4 py-2 rounded shadow-sm hover:bg-purple-200 transition"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">👤 Registered Users</h2>

      {/* Search Bar */}
      <div className="relative mb-6 w-full md:w-1/2">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Name..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {/* User List Table */}
      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-purple-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user._id} className="border-t hover:bg-purple-50 transition">
                <td className="px-5 py-4 font-medium">{user.name}</td>
                <td className="px-5 py-4">{user.email}</td>
                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
