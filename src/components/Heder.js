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
        <header className="bg-[#00235B] text-white py-3 px-6 shadow-lg relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Bodo App Logo" className="h-12 w-auto" />
                    <span className="text-2xl font-bold tracking-tight">BODO APP</span>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex items-center text-white focus:outline-none"
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
                    } md:flex md:items-center md:space-x-8 w-full md:w-auto md:static absolute top-16 left-0 bg-[#00235B] md:bg-transparent z-50 p-4 md:p-0`}
                >
                    <a href="/" className="block px-4 py-2 md:py-0 text-white hover:text-blue-200 transition-colors font-medium">
                        Home
                    </a>
                    <a href="/about" className="block px-4 py-2 md:py-0 text-white hover:text-blue-200 transition-colors font-medium">
                        About
                    </a>
                    <a href="/boarding" className="block px-4 py-2 md:py-0 text-white hover:text-blue-200 transition-colors font-medium">
                        Boardings
                    </a>
                    <a href="/contact" className="block px-4 py-2 md:py-0 text-white hover:text-blue-200 transition-colors font-medium">
                        Contact
                    </a>
                </nav>

                {/* Right-side Profile & Post Ad Button */}
                <div className="flex items-center space-x-6">
                    {/* Post Ad Button */}
                    <Link
                        to="/addListning"
                        className="hidden md:flex bg-[#FFB100] text-white py-2.5 px-6 rounded-full hover:bg-[#FFC436] transition-colors items-center space-x-2 font-semibold shadow-md"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Post Ad</span>
                    </Link>

                    {/* Profile Button & Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="bg-white/10 backdrop-blur-sm text-white py-2.5 px-4 rounded-full flex items-center space-x-2 hover:bg-white/20 transition-colors focus:outline-none"
                        >
                            <UserIcon className="h-5 w-5" />
                            <span className="max-w-[150px] truncate">{user ? user.email : "Profile"}</span>
                        </button>

                        {/* Profile Dropdown Menu */}
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50">
                                {user ? (
                                    <>
                                        <a
                                            href="/my-ads"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00235B] transition-colors"
                                        >
                                            My Ads
                                        </a>
                                        <a
                                            href="/saved-ads"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00235B] transition-colors"
                                        >
                                            Saved Ads
                                        </a>
                                        <button
                                            onClick={() => setShowLogoutConfirm(true)}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <a
                                            href="/login"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00235B] transition-colors"
                                        >
                                            Login
                                        </a>
                                        <a
                                            href="/register"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00235B] transition-colors"
                                        >
                                            Register
                                        </a>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Confirm Logout
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to logout from your account?
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
