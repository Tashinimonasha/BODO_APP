import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdListAlt } from 'react-icons/md'; // Listings icon
import { FaUsers } from 'react-icons/fa';    // Users icon

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-4">
      <Link
        to="/admin/listings"
        className={`flex items-center gap-3 p-2 rounded ${
          pathname.includes('listings') ? 'bg-blue-600' : 'hover:bg-gray-700'
        }`}
      >
        <MdListAlt size={20} />
        Manage Listings
      </Link>
      <Link
        to="/admin/users"
        className={`flex items-center gap-3 p-2 rounded ${
          pathname.includes('users') ? 'bg-blue-600' : 'hover:bg-gray-700'
        }`}
      >
        <FaUsers size={20} />
        Manage Users
      </Link>
    </div>
  );
};

export default Sidebar;
