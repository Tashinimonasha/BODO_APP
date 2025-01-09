import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Heder";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddListing from "./pages/AddListing";
import Boarding from "./pages/Boarding";
import BoardingDetailsPage from "./pages/BoardingDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurServices from "./pages/Our Services";
import ListingsPage from "./pages/MyAds";
import SavedAds from "./pages/SavedAds";
import ForgotPassword from "./pages/Forgotpassword";



function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addListning" element={<AddListing />} />
          <Route path="/boarding" element={<Boarding />} />
          <Route path="/boarding/:boardingId" element={<BoardingDetailsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/my-ads" element={<ListingsPage />} />
          <Route path="/saved-ads" element={<SavedAds />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
