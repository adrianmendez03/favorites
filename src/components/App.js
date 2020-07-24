import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Navbar />
            <br />
            <Route path="/" exact component={FavoritesList} />
            <Route path="/edit/:id" component={EditFavorite} />
            <Route path="/create" component={CreateFavorite} />
            <Route path="/user" component={CreateUser} />
        </Router>
    )
}

export default App;