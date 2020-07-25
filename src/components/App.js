import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Navbar from './Navbar';
import FavoritesList from './favorites/FavoritesList';
import EditFavorite from './favorites/EditFavorite';
import CreateFavorite from './favorites/CreateFavorite';
import CreateUser from './favorites/CreateUser';

import './App.css';

const App = () => {
    return (
        <Router>
            <div className="grid-container">
                <Navbar />
                <br />
                <Route path="/" exact component={FavoritesList} />
                <Route path="/edit/:id" component={EditFavorite} />
                <Route path="/create" component={CreateFavorite} />
                <Route path="/user" component={CreateUser} />
            </div>
        </Router>
    )
}

export default App;