// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">BODO APP</div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/about">Service</Link></li>
                    <li><Link to="/about">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
