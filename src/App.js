// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home'; // Home component (could be a main or landing page)
import About from './About'; // About component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />       {/* Home route */}
          <Route path="/about" element={<About />} /> {/* About route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
