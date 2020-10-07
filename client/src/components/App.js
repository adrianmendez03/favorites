import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';

import FavoriteWelcome from './favorites/FavoriteWelcome';
import FavoritesHome from './favorites/FavoritesHome';
import History from '../History'
import { 
    signIn, 
    signOut, 
    fetchUsers, 
    fetchUser, 
    unfetchUser 
} from '../actions';

import '../styles/styles.css'

class App extends React.Component {

    componentDidMount() {

        const GOOGLE_CLIENT_ID = '156297557155-elohe7rnf5e0br6formup3jt5nsl7ld3.apps.googleusercontent.com';

        console.log(process.env)
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: GOOGLE_CLIENT_ID,
                scope: 'email profile'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    
    createUser = (userId, userName) => {
        const newUser = {
            id: userId,
            username: userName
        };

    
        Axios.post('http://localhost:5000/users/add', newUser)
            .then(res => {
                this.props.fetchUser(this.props.id);
                this.props.fetchUsers();
            })
    
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().Ad, this.auth.currentUser.get().getBasicProfile().JJ);
            this.props.fetchUser(this.props.id);
            this.createUser(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().Ad);
        } else {
            this.props.signOut();
            this.props.unfetchUser()
        }
    }

    onSignInClick = () => {
        this.auth.signIn(this);
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    render() {
        return (
            <Router history={History}>
                <Route 
                    path="/" 
                    exact 
                    render={() => <FavoriteWelcome 
                        onAuthChange={this.onAuthChange}
                        onSignInClick={this.onSignInClick}
                    /> } 
                />
                <Route 
                    path="/home" 
                    render={() => <FavoritesHome 
                        onAuthChange={this.onAuthChange}
                        onSignOutClick={this.onSignOutClick}
                    /> }  
                />
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        name: state.auth.userName,
        picture: state.auth.profilePicture,
        id: state.auth.userId
    };
}

export default connect(mapStateToProps, { signIn, signOut, fetchUsers, fetchUser, unfetchUser })(App);