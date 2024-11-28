// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home'; // Home component (could be a main or landing page)
 import Contact from './Contact';
import Services from './Services';
import Login from "./Login";
import Register from "./Register";
import PostAd from "./PostAd";
import Footer from './Footer'; // Import the Footer component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />       {/* Home route */}
          
          <Route path="/contact" element={<Contact />} /> {/* Contact route */}
          <Route path="/services" element={<Services />} /> {/* Services route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-ad" element={<PostAd />} />
        </Routes>
        <Footer /> {/* Include the Footer component at the bottom */}
      </div>
    </Router>
  );
}

export default App;

