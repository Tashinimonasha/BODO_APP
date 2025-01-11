import React, { useState, useEffect } from "react";
import { PlusIcon, UserIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import logo from "../assets/footer/logo1.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setShowLogoutConfirm(false);
        navigate("/login");
    };

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
                    isMobileMenuOpen ? "block" : "hidden"
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
            </nav>

            {/* Right-side Profile & Post Ad Button */}
            <div className="flex items-center space-x-4">
                {/* Post Ad Button */}
                <Link
                    to="/addListning"
                    className="hidden md:flex bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-400 items-center space-x-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span>Post Ad</span>
                </Link>

                {/* Profile Button */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="bg-white text-blue-600 p-2 rounded-full flex items-center space-x-2"
                    >
                        <UserIcon className="h-5 w-5" />
                        <span>{user ? user.email : "Profile"}</span>
                    </button>

                    {/* Profile Menu */}
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 bg-white text-black mt-2 w-40 rounded shadow">
                            {user ? (
                                <>
                                    {/* <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                        Personal Information
                                    </a> */}
                                    <button
                                        onClick={() => setShowLogoutConfirm(true)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                    <a href="/my-ads" className="block px-4 py-2 hover:bg-gray-100">
                                        My Ads
                                    </a>
                                    <a href="/saved-ads" className="block px-4 py-2 hover:bg-gray-100">
                                        Saved Ads
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a href="/login" className="block px-4 py-2 hover:bg-gray-100">
                                        Login
                                    </a>
                                    <a href="/register" className="block px-4 py-2 hover:bg-gray-100">
                                        Register
                                    </a>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Popup */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="mb-4 text-lg font-semibold text-black">Are you sure you want to logout?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
