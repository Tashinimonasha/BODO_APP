import React from "react";
import logo from "../assets/footer/logo1.png";

const Footer = () => {
  return (
      <footer className="bg-blue-950 text-white py-8">
        <div className="container mx-auto px-4">

          {/* Grid layout for the three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

            {/* About Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-4">
                <img
                    src={logo}
                    alt="BODOAPP Logo"
                    className="w-20 h-20"
                />
                <div>
                  <h3 className="text-lg font-bold mb-2">About BODOAPP</h3>
                  <p className="text-sm leading-6">
                    BODOAPP helps students and workers find the best boarding
                    places quickly and efficiently.
                    Your comfort is our priority.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/home" className="hover:text-blue-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-blue-300 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-blue-300 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-blue-300 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-bold mb-2">Contact Us</h3>
              <p>
                Email: <a href="mailto:info@bodoapp.com" className="hover:underline">info@bodoapp.com</a>
              </p>
              <p>
                Phone: <a href="tel:+94 723 000 823" className="hover:underline">+94 723 000 823</a>
              </p>
              <div className="flex justify-center md:justify-start space-x-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/ios-filled/30/ffffff/facebook.png" alt="Facebook" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/ios-filled/30/ffffff/github.png" alt="GitHub" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/ios-filled/30/ffffff/instagram-new.png" alt="Instagram" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-6 border-t border-blue-700 pt-4 text-center">
            <p>&copy; {new Date().getFullYear()} BODOAPP. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
