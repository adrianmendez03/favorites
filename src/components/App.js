import React from 'react';
import { Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import FavoriteHome from './favorites/FavoriteHome';
import FavoritesList from './favorites/FavoritesList';
import EditFavorite from './favorites/EditFavorite';
import DeleteFavorite from './favorites/DeleteFavorite';
import CreateFavorite from './favorites/CreateFavorite';
import CreateUser from './favorites/CreateUser';
import History from '../History'

import './App.css';

const App = () => {
    return (
        <Router history={History}>
            <div className="grid-container">
                <Navbar />
                <br />
                <Route path="/" exact component={FavoriteHome} />
                <Route path="/home" exact component={FavoritesList} />
                <Route path="/favorites/edit/:id" component={EditFavorite} />
                <Route path="/favorites/delete/:id" component={DeleteFavorite} />
                <Route path="/favorites/new" component={CreateFavorite} />
                <Route path="/user" component={CreateUser} />
            </div>
        </Router>
    )
}

export default App;