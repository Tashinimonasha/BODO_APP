import React from "react";
import logo from "../assets/footer/logo1.png";

const Footer = () => {
  const whatsappNumber = "0742388071"; // Replace with your WhatsApp number

  return (
      <footer className="bg-blue-950 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-4">
                <img src={logo} alt="BODOAPP Logo" className="w-20 h-20" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">About BODOAPP</h3>
                  <p className="text-sm leading-6">
                    BODOAPP makes it easy for students and workers to find nearby boarding accommodations with comfort and convenience. Your satisfaction is our mission.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/" className="hover:text-blue-300">Home</a></li>
                <li><a href="/about" className="hover:text-blue-300">About Us</a></li>
                <li><a href="/boarding" className="hover:text-blue-300">Boardings</a></li>
                <li><a href="/contact" className="hover:text-blue-300">Contact</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <p className="mb-2">Email: <a href="mailto:info@bodoapp.com" className="hover:underline">info@bodoapp.com</a></p>
              <p className="mb-2">Phone: <a href={`https://wa.me/${whatsappNumber}`} className="hover:underline">0742388071</a></p>
              <div className="flex space-x-6 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/ios-filled/30/ffffff/facebook.png" alt="Facebook" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/ios-filled/30/ffffff/github.png" alt="GitHub" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/ios-filled/30/ffffff/instagram-new.png" alt="Instagram" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/ios-filled/30/ffffff/linkedin.png" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-blue-700 pt-4 text-center">
            <p>&copy; {new Date().getFullYear()} BODOAPP. All Rights Reserved.</p>
            <p>Designed with ❤ by the BODOAPP Team</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
