import React, { useReducer } from 'react';
import { Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import FavoriteHome from './favorites/FavoriteHome';
import FavoritesList from './favorites/FavoritesList';
import ViewFavorite from './favorites/ViewFavorite';
import EditFavorite from './favorites/EditFavorite';
import DeleteFavorite from './favorites/DeleteFavorite';
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
                <Route path="/favorites/view/:id" component={ViewFavorite} />
                <Route path="/favorites/edit/:id" component={EditFavorite} />
                <Route path="/favorites/delete/:id" component={DeleteFavorite} />
            </div>
        </Router>
    )
}

export default App;