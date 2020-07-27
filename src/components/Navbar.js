import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">Favorites</Link>
            </div>
            <ul className="nav_links">
                <li><Link className="nav_item" to="/view">View Favorites</Link></li>
                <li><Link className="nav_item" to="/edit/:id">Edit Favorites</Link></li>
                <li><Link className="nav_item" to="/create">Create Favorites</Link></li>
            </ul>
            <GoogleAuth />
        </div>
    )
}

export default Navbar;