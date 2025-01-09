import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/home/img.png";

const Home = () => {
    return (
        <div className="bg-blue-950 text-white min-h-screen">

            <header className="bg-blue-700 py-10">
                <div className="container mx-auto px-6 text-center md:text-left md:flex items-center justify-between">
                    <div className="mb-6 md:mb-0 md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            Welcome to <span className="text-yellow-400">BODOAPP</span>
                        </h1>
                        <p className="text-lg leading-relaxed mb-6">
                            Find the best boarding places near you with ease and comfort.
                            Whether you're a student or a worker, we've got you covered.
                        </p>
                        <Link
                            to="/About"
                            className="bg-yellow-400 text-blue-950 px-6 py-3 rounded font-bold uppercase text-sm hover:bg-yellow-500 transition"
                        >
                            Learn More
                        </Link>
                    </div>
                    <div className="md:w-1/2">
                        <img src={heroImage} alt="Hero" className="w-full h-49 object-cover mx-auto md:mx-0"/>
                    </div>


                </div>
            </header>


            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-black mb-8">Why Choose BODOAPP?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-blue-700 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-4">
                            <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
                            <p className="text-sm leading-relaxed">
                                Our platform is designed to make finding boarding places simple and straightforward for
                                everyone.
                            </p>
                        </div>
                        <div className="bg-blue-700 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-4">
                            <h3 className="text-xl font-semibold mb-4">Reliable Listings</h3>
                            <p className="text-sm leading-relaxed">
                                We ensure all listings are verified and reliable, offering you peace of mind.
                            </p>
                        </div>
                        <div className="bg-blue-700 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-4">
                            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                            <p className="text-sm leading-relaxed">
                                Our support team is available around the clock to assist with your queries.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-yellow-400 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-blue-950 mb-6">
                        Ready to Find Your Next Boarding Place?
                    </h2>
                    <Link
                        to="/Boarding"
                        className="bg-blue-950 text-yellow-400 px-8 py-4 rounded font-bold uppercase text-sm hover:bg-blue-900 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </section>


        </div>
    );
};

export default Home;
