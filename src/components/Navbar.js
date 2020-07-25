import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-grid">
                <div className="navbar-logo">
                    <Link to="/">Favorites</Link>
                </div>
                <div className="navbar-content-grid">
                    <div className="nav-items">
                        <Link to="/" className="navbar-content">Home</Link>
                        <Link to="/edit/:id" className="navbar-content">Edit Favorites</Link>
                        <Link to="/create" className="navbar-content">Create Favorites</Link>
                        <Link to="/user" className="navbar-content">Login/Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;