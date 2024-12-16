import React, { useState } from "react";
import {PlusIcon, UserIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
      <header className="bg-blue-950 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Bodo App</div>
        <nav className="space-x-4">
          <a href="/" className="hover:text-yellow-400">
            Home
          </a>
          <a href="/about" className="hover:text-yellow-400">
            About
          </a>
          <a href="/boardings" className="hover:text-yellow-400">
            Boardings
          </a>
          <a href="/contact" className="hover:text-yellow-400">
            Contact
          </a>
          <a href="/services" className="hover:text-yellow-400">
            Our Service
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link
                to="/addListning"  // Navigate to the PostAdPage
                className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-400 flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5"/>
              <span>Post Ad</span>
            </Link>
          </div>

          {/* Profile Button */}
          <div className="relative">
            <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="bg-white text-blue-600 p-2 rounded-full flex items-center space-x-2"
            >
              <UserIcon className="h-5 w-5"/>
              <span>Profile</span>
            </button>

            {/* Profile Menu */}
            {isProfileMenuOpen && (
                <div className="absolute right-0 bg-white text-black mt-2 w-40 rounded shadow">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Personal Information
                  </a>
                  <a href="/login" className="block px-4 py-2 hover:bg-gray-100">
                    Login
                  </a>
                  <a href="/register" className="block px-4 py-2 hover:bg-gray-100">
                    Register
                  </a>
                  <a href="/my-ads" className="block px-4 py-2 hover:bg-gray-100">
                    My Ads
                  </a>
                  <a href="/reviews" className="block px-4 py-2 hover:bg-gray-100">
                    Reviews
                  </a>
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;
