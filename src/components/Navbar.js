import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/home">Favorites</Link>
            </div>
            <ul className="nav-links">
                <li><Link className="nav-item" to="/home">Home</Link></li>
                <li><Link className="nav-item" to="/edit/:id">Edit Favorites</Link></li>
                <li><Link className="nav-item" to="/favorites/new">Create Favorites</Link></li>
            </ul>
            <GoogleAuth />
        </div>
    )
}

export default Navbar;