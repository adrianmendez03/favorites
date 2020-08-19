import React from 'react';
import { Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import FavoriteHome from './favorites/FavoriteHome';
import FavoritesList from './favorites/FavoritesList';
import ViewFavorite from './favorites/ViewFavorite';
import DeleteFavorite from './favorites/DeleteFavorite';
import History from '../History'

import '../styles/styles.css'

const App = () => {
    return (
        <Router history={History}>
            <Route path="/" exact component={FavoriteHome} />
            <div className="grid-container">
                <br />
                <Route path="/home" exact component={FavoritesList} />
                <Route path="/favorites/view/:id" component={ViewFavorite} />
                <Route path="/favorites/delete/:id" component={DeleteFavorite} />
            </div>
        </Router>
    )
}

export default App;