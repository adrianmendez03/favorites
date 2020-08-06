import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GoogleAuth from './GoogleAuth'

class Navbar extends React.Component {

    // Renders different Navbar based on Signed in status

    renderNavList() {
        if (this.props.isSignedIn) {
            return (
                <ul className="nav-links">
                    <li><Link className="nav-item" to="/home">Home</Link></li>
                    <li><Link className="nav-item" to={{ pathname: `/favorites/view/${this.props.currentUserId}`, state: { id: this.props.currentUserId} }}>My Favorites</Link></li>
                </ul>
            )
        } else {
            return (
                <ul className="nav-links">
                    <li><Link className="nav-item" to="/home">Home</Link></li>
                </ul>
            )
        }
    }

    render() {
        return (
            <div className="navbar">
                <div className="logo">
                    <Link to="/home">Favorites</Link>
                </div>
                {this.renderNavList()}
                <GoogleAuth />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Navbar);