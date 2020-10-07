import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ReactComponent as Planet } from '../../images/planet.svg';
import { ReactComponent as LogoText } from '../../images/text.svg';

import LoadingFavorites from './LoadingFavorites';

class FavoriteWelcome extends React.Component {

    renderGoogle() {
        return (
            <button onClick={this.props.onSignInClick} className="welcome-google">
                Login with Google
            </button>
        )
    }

    renderContent() {
        if (this.props.isSignedIn === false) {
            return (
                <div className="grid-welcome">
                    <Planet id="planet"/>
                    <div className="grid-welcome-left">
                        <LogoText id="logo-text"/>
                        <div className="welcome-left-content">
                            <ul className="welcome-content">
                                <li id="text1"><h2>Share your favorites.</h2></li>
                                <li id="text2"><h2>Explore what's around you.</h2></li>
                                <li id="text3"><h2>Login to get started.</h2></li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-welcome-right">
                        {this.renderGoogle()}
                    </div>
                </div>
            )   
        } else if (this.props.isSignedIn === null) {
            return (
                <div>
                    <LoadingFavorites />
                </div>
            )
        } else {
            return <Redirect to="/home" />
        }
    }

    render() {
        return this.renderContent();
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps)(FavoriteWelcome);