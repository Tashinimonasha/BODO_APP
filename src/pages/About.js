import React from "react";

const About = () => {
    return (
        <div className="bg-white text-blue-900 min-h-screen">

            <header className="bg-white-700 py-10">
                <div className="container mx-auto px-6 text-center md:text-left md:flex items-center justify-between">
                    <div className="mb-6 md:mb-0 md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-yellow-400">
                            About <span className="text-black">BODOAPP</span>
                        </h1>
                        <p className=" font-bold leading-relaxed mb-8 text-blue-900">
                            BODOAPP is the easiest way to find nearby boarding accommodations for students and workers. Whether you're looking for a place near your workplace or educational institution, we ensure comfort and convenience in your search.
                        </p>
                    </div>
                </div>
            </header>
            {/* Mission and Vision Section */}
            <section className="py-16 bg-gradient-to-r from-white-500 via-white-600 to-white-700">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center space-x-8">
                        {/* Mission Section */}
                        <div className="bg-gradient-to-r from-white-600 to-blue-700 text-black p-8 rounded-xl shadow-2xl max-w-lg">
                            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Our Mission</h2>
                            <h3 className="text-2xl font-semibold mb-4">Simplifying Your Search for the Perfect Boarding</h3>
                            <p className="text-lg leading-relaxed">
                                At BODOAPP, our mission is to make finding safe, affordable, and comfortable boarding options simple and seamless. We strive to provide you with a user-friendly platform that allows you to discover and book your ideal accommodation near educational or professional spaces.
                            </p>
                        </div>

                        {/* Vision Section */}
                        <div className="bg-gradient-to-r from-white-600 via-blue-700 to-blue-800 text-black p-8 rounded-xl shadow-2xl max-w-lg">
                            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Our Vision</h2>
                            <h3 className="text-2xl font-semibold mb-4">Empowering You to Find the Best Living Spaces</h3>
                            <p className="text-lg leading-relaxed">
                                We envision a future where finding safe and reliable boarding accommodations is effortless and hassle-free. Through BODOAPP, we aim to connect individuals with the most suitable living spaces, ensuring convenience, comfort, and peace of mind for students and professionals alike.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="py-16 bg-yellow-500">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-8 text-black-400">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-blue-700">Real-Time Availability</h3>
                            <p className="text-sm leading-relaxed">
                                View real-time availability of boarding places to ensure you never miss out on a good option.
                            </p>
                        </div>
                        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-blue-700">Verified Listings</h3>
                            <p className="text-sm leading-relaxed">
                                All listings are verified to ensure you get the best and most reliable accommodations.
                            </p>
                        </div>
                        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-blue-700">User Reviews</h3>
                            <p className="text-sm leading-relaxed">
                                Check out honest reviews from other users to make an informed decision before booking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Testimonial Section */}
            <section className="py-16 bg-black-700">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-8 text-yellow-400">What Our Users Say</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
                        {/* Testimonial Card 1 */}
                        <div className="bg-blue-400 text-black p-8 rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:bg-blue-600 active:bg-lightBlue-400">
                            <p className="text-sm leading-relaxed mb-6">
                                "BODOAPP made my search for a boarding place so easy. I found a great spot near my university, and the booking process was a breeze!"
                            </p>
                            <p className="font-semibold text-white">Pasan Abegunawardhana</p>
                            <p className="text-sm text-white">Student, University of Colombo</p>
                        </div>
                        {/* Testimonial Card 2 */}
                        <div className="bg-blue-400 text-black p-8 rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:bg-blue-600 active:bg-lightBlue-400">
                            <p className="text-sm leading-relaxed mb-6">
                                "As a worker, finding nearby accommodation used to be a hassle, but BODOAPP has made the process so much smoother. Highly recommend!"
                            </p>
                            <p className="font-semibold text-white">Sanduni Dahanayaka</p>
                            <p className="text-sm text-white">Software Engineer</p>
                        </div>
                        {/* Testimonial Card 3 */}
                        <div className="bg-blue-400 text-black p-8 rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:bg-blue-600 active:bg-lightBlue-400">
                            <p className="text-sm leading-relaxed mb-4">
                                "BODOAPP has been a lifesaver for me! I was able to find a place that suits my needs perfectly. The app is very user-friendly and reliable."
                            </p>
                            <p className="font-semibold text-white">Amila Silva</p>
                            <p className="text-sm text-white">Marketing Specialist</p>
                        </div>
                    </div>
                </div>
            </section>




            {/* Call to Action Section */}
            <section className="bg-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-black-400 mb-6">
                        Ready to Find Your Next Boarding Place?
                    </h2>
                    <p className="text-lg leading-relaxed mb-8 text-blue">
                        Join thousands of satisfied users who have found their ideal accommodations with ease using BODOAPP.
                    </p>

                </div>
            </section>

        </div>
    );
};

export default About;
