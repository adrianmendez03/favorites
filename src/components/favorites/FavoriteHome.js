import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteHome = () => {
    return (
        <div className="home-content">
            <div className="intro">
                <h1> Welcome to Favorites</h1>
                <h3>Socializing the way we socialize!</h3>
            </div>
            <div className="intro-content">
                <p>
                    Planning a trip? <br />
                    Bored at home? <br />
                    View or share Favorites to see whats popular around you! <br />
                    From restaurants to the outdoors to nightlife!
                </p>
            </div>
            <div className="intro" id="home-bottom">
                <h1>Get Started</h1>
                <Link><h3>Login with Google</h3></Link>
            </div>
        </div>
    )
}

export default FavoriteHome;