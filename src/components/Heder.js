import React, { useState } from "react";
import { PlusIcon, UserIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import logo from "../assets/footer/logo1.png";

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <header className="bg-blue-950 text-white p-4 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 text-xl font-bold">
              <img src={logo} alt="Bodo App Logo" className="h-10 w-auto" />
              <span>BODO APP</span>
          </div>

        {/* Mobile Menu Icon */}
        <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center text-white"
        >
          {isMobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
          ) : (
              <MenuIcon className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav
            className={`${
                isMobileMenuOpen ? 'block' : 'hidden'
            } md:flex md:space-x-4 md:items-center w-full md:w-auto md:static absolute top-16 left-0 bg-blue-950 md:bg-transparent`}
        >
          <a href="/" className="block px-4 py-2 md:py-0 hover:text-yellow-400">
            Home
          </a>
          <a href="/about" className="block px-4 py-2 md:py-0 hover:text-yellow-400">
            About
          </a>
          <a href="/boarding" className="block px-4 py-2 md:py-0 hover:text-yellow-400">
            Boardings
          </a>
          <a href="/contact" className="block px-4 py-2 md:py-0 hover:text-yellow-400">
            Contact
          </a>
          <a href="/services" className="block px-4 py-2 md:py-0 hover:text-yellow-400">
            Our Service
          </a>
        </nav>

        {/* Right-side Profile & Post Ad Button */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link
                to="/addListning"
                className="hidden md:flex bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-400 items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Post Ad</span>
            </Link>
          </div>

          {/* Profile Button */}
          <div className="relative">
            <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="bg-white text-blue-600 p-2 rounded-full flex items-center space-x-2"
            >
              <UserIcon className="h-5 w-5" />
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
                    <a href="/saved-ads" className="block px-4 py-2 hover:bg-gray-100">
                        Saved Ads
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
