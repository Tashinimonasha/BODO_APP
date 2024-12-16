import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Heder";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddListing from "./pages/AddListing";

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addListning" element={<AddListing />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
