import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_URL;

const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const apiLimit = 100; // Increased to fetch more users per request

  // ** Fetch all users with pagination **
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        let allUsers = [];
        let offset = 0;
        let hasMore = true;
        let attemptCount = 0;
        const maxAttempts = 20; // Prevent infinite loops

        // Keep fetching until hasMore is false or max attempts reached
        while (hasMore && attemptCount < maxAttempts) {
          console.log(`Fetching batch ${attemptCount + 1} at offset ${offset}...`);
          
          const response = await fetch(`${apiUrl}/user/get-all-users?limit=${apiLimit}&offset=${offset}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }

          const data = await response.json();
          console.log(`Batch ${attemptCount + 1} response:`, {
            dataLength: data.data?.length,
            total: data.total,
            hasMoreFlag: data.pagination?.hasMore,
            pagination: data.pagination
          });
          
          const fetchedUsers = data.data || [];
          
          // If API returns total count, use that to determine when to stop
          const totalCount = data.total || data.totalCount || data.count;
          
          allUsers = [...allUsers, ...fetchedUsers];
          
          console.log(`After batch ${attemptCount + 1}: ${allUsers.length} total users collected`);
          
          // Determine if there are more pages
          if (data.pagination?.hasMore === false) {
            console.log('API indicates no more pages (hasMore=false)');
            hasMore = false;
          } else if (fetchedUsers.length < apiLimit) {
            console.log(`Fetched ${fetchedUsers.length} users < limit ${apiLimit}, stopping pagination`);
            hasMore = false;
          } else if (totalCount && allUsers.length >= totalCount) {
            console.log(`Reached total count: ${allUsers.length} >= ${totalCount}`);
            hasMore = false;
          }
          
          offset += apiLimit;
          attemptCount++;
        }

        console.log('Final total users fetched:', allUsers.length);
        console.log('All users:', allUsers);
        
        // Remove duplicates if any
        const uniqueUsers = Array.from(new Map(allUsers.map(user => [user.id, user])).values());
        console.log('Unique users after deduplication:', uniqueUsers.length);
        
        setUsers(uniqueUsers);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        toast.error('Error fetching users');
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const filtered = users.filter((user) => {
    // Try filtering by name, username, or email
    const nameMatch = user?.name?.toLowerCase().includes(searchName.toLowerCase());
    const usernameMatch = user?.username?.toLowerCase().includes(searchName.toLowerCase());
    const emailMatch = user?.email?.toLowerCase().includes(searchName.toLowerCase());
    return nameMatch || usernameMatch || emailMatch;
  });

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchName]);

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filtered.slice(startIndex, endIndex);

  const deleteUser = (id, name) => {
    setDeleteModal({ isOpen: true, userId: id, userName: name });
  };

  const confirmDeleteUser = async () => {
    const { userId } = deleteModal;
    setIsDeleting(true);
    try {
      const response = await fetch(`${apiUrl}/user/delete/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      // Remove from local state
      const updated = users.filter((u) => u.id !== userId);
      setUsers(updated);
      setDeleteModal({ isOpen: false, userId: null, userName: null });
      toast.success('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error(err.message || 'Error deleting user');
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, userId: null, userName: null });
  };

  // ** Format date safely **
  const formatDate = (dateString) => {
    try {
      if (!dateString) {
        // Return dummy date if not set
        return new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // Return dummy date if invalid
        return new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      // Return dummy date on error
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
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

      <h2 className="text-4xl font-bold text-gray-800 mb-2">👤 Registered Users</h2>
      <p className="text-lg text-gray-600 mb-8">Total: <span className="font-bold text-blue-600">{users.length}</span> users</p>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium">Error loading users: {error}</p>
        </div>
      )}

      {/* Search Bar */}
      {!loading && users.length > 0 && (
        <div className="relative mb-6 w-full md:w-1/2">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      )}

      {/* User List Table */}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-purple-600 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Joined Date</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-purple-50 transition">
                  <td className="px-5 py-4 font-medium">{user.name || user.username}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">{user.phone || 'N/A'}</td>
                  <td className="px-5 py-4">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => deleteUser(user.id, user.name || user.username)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {filtered.length > itemsPerPage && (
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
              <p className="text-sm text-gray-600">
                Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, filtered.length)}</strong> of <strong>{filtered.length}</strong> users
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded transition ${
                        currentPage === i + 1
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && users.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users available</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4h.01m-6.938-4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Title and Message */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Delete User</h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteModal.userName}</span>? This action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                disabled={isDeleting}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                  isDeleting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UsersPage;
