import React from "react";


const OurServices = () => {
    return (
        <div className="bg-white text-black min-h-screen">
             {/* Header Section with Background Image */}
            <header className="py-10 bg-gradient-to-r from-light-blue-500 to-light-blue-600 text-center">
                <h1 className="text-5xl font-bold text-yellow-400">Our Services</h1>
                <p className="text-lg mt-4 text-black">
                    BODOAPP offers a wide range of services to make your search for the perfect boarding accommodation easier than ever.
                </p>
            </header>


            <section className="py-16 bg-gradient-to-r from-white-500 via-white-600 to-white-700">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold mb-8 text-black">Our Top Services</h2>
                    <div className="flex justify-center space-x-12">
                        {/* Service 1 */}
                        <div className="bg-white text-black p-8 rounded-xl shadow-2xl max-w-xs transform transition-transform duration-300 hover:translate-y-4">

                            <h3 className="text-2xl font-semibold mb-4">Real-Time Availability</h3>
                            <p className="text-lg leading-relaxed">
                                Stay updated with real-time availability of boarding places, ensuring you don’t miss out on the best options nearby.
                            </p>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white text-black p-8 rounded-xl shadow-2xl max-w-xs transform transition-transform duration-300 hover:translate-y-4">

                            <h3 className="text-2xl font-semibold mb-4">Verified Listings</h3>
                            <p className="text-lg leading-relaxed">
                                All listings are verified to ensure you get reliable, trustworthy accommodations that meet your needs.
                            </p>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white text-black p-8 rounded-xl shadow-2xl max-w-xs transform transition-transform duration-300 hover:translate-y-4">

                            <h3 className="text-2xl font-semibold mb-4">User Reviews & Ratings</h3>
                            <p className="text-lg leading-relaxed">
                                Read reviews from other users and make informed decisions based on their experiences before booking your next place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Section 2 */}
            <section className="py-16 bg-yellow-500">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold mb-8 text-black">Additional Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Service 4 */}
                        <div className="bg-white text-black p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-4">
                            <h3 className="text-xl font-semibold mb-4 text-blue-700">Affordable Pricing</h3>
                            <p className="text-sm leading-relaxed">
                                We ensure that all boarding accommodations listed on our platform are reasonably priced and fit within your budget.
                            </p>
                        </div>

                        {/* Service 5 */}
                        <div className="bg-white text-black p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-4">
                            <h3 className="text-xl font-semibold mb-4 text-blue-700">Search Filters</h3>
                            <p className="text-sm leading-relaxed">
                                Use advanced search filters to find the ideal boarding accommodation based on your preferences such as location, price, and amenities.
                            </p>
                        </div>

                        {/* Service 6 */}
                        <div className="bg-white text-black p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-4">
                            <h3 className="text-xl font-semibold mb-4 text-blue-700">Easy Booking Process</h3>
                            <p className="text-sm leading-relaxed">
                                Our platform provides an easy and secure booking process, making it simple for you to reserve your accommodation in just a few clicks.
                            </p>
                        </div>

                        {/* Service 7 */}
                        <div className="bg-white text-black p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-4">
                            <h3 className="text-xl font-semibold mb-4 text-blue-700">Customer Support</h3>
                            <p className="text-sm leading-relaxed">
                                Our dedicated customer support team is available 24/7 to assist you with any queries or issues during your booking process.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
                    <p className="text-lg mb-8">
                        Explore our services and find the perfect boarding accommodation near you today. Join thousands of satisfied users!
                    </p>
                    <a href="/sign-up" className="py-3 px-6 bg-yellow-400 text-black font-bold text-lg rounded-lg hover:bg-yellow-500 transition duration-300">
                        Sign Up Now
                    </a>
                </div>
            </section>
        </div>
    );
};

export default OurServices;
