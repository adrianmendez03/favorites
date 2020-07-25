import React from 'react';
import { Link } from 'react-router-dom';

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
                <li><Link className="nav_item" to="/user">Login with Google</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;