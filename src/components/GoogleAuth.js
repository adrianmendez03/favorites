import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '29454929611-8qmv7hoe3a6q4cm1d2iihnp4rhmjvt9d.apps.googleusercontent.com',
                scope: 'email profile'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().Cd);
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn(this);
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === false) {
            return (
                <button onClick={this.onSignInClick} className="google-button">
                    Login with Google
                </button>
            )
        } else if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="google-button">
                    Sign Out
                </button>
            )
        } else {
            return null;
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);