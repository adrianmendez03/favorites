import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

import Mapbox from '../Mapbox';
import Explore from './Explore';
import FavoritesList from './FavoritesList';
import LoadingFavorites from './LoadingFavorites';
import Sidebar from './Sidebar';
import { fetchUser, fetchFavorites } from '../../actions';

class FavoritesHome extends React.Component {

    is_mounted = false;

    state =  {
        display: "home", 
        locationId: null,
        coord: {},
        name: null,
        location: null, 
        description: null
    }

    componentDidMount() {
        this.props.fetchFavorites();
        this.is_mounted = true;
    }

    componentWillUnmount() {
        this.is_mounted = false;
    }

    fetchMap(map) {
        window.map = map;
    }

    updateDisplay = (newDisplay) => {
        this.setState({ display: newDisplay });
    }

    updateCenter(coord) {
        try {
            window.marker.remove()
        } catch(err) {
            console.log(err)
        }

        var marker = new mapboxgl.Marker()
            .setLngLat(coord)
            .addTo(window.map);
        
        window.marker = marker;

        window.map.flyTo({
            center: coord,
            zoom: 14,
            essential: true 
        })
    }

    updateQuery = item => {
        this.setState({
            locationId: item.id,
            coord: item.geometry.coordinates,
            name: item.text,
            location: item.place_name,
            description: item.properties.category
        })
    }

    onClick = (e) => {
        const newFavorite =  {
            id: this.props.id,
            locationId: this.state.locationId,
            coord: this.state.coord,
            name: this.state.name,
            location: this.state.location,
            description: this.state.description
        }

        Axios.post(`https://salty-tor-91484.herokuapp.com/favorites/add`, newFavorite)
        .then(res => {
            console.log(res.data);
        });
        Axios.post(`https://salty-tor-91484.herokuapp.com/users/update/${this.props.id}`, newFavorite)
        .then(res => {
            console.log(res.data);
            this.props.fetchUser(this.props.id);
            alert('Favorite added!');
            Axios.post(`https://salty-tor-91484.herokuapp.com/favorites/update/${this.state.locationId}`, newFavorite)
            .then(res => {
                console.log(res.data);
                this.props.fetchFavorites();
                this.setState({
                    locationId: null,
                    coord: null,
                    name: null,
                    location: null,
                    description: null
                });
            });
        });
    }

    renderAddFavorite() {
        const { locationId } = this.state;
        const { favorites } = this.props.user;
        if (locationId === null) {
            return null;
        } else {
            if (favorites.includes(locationId)) {
                return null;
            } else {
                return <button onClick={this.onClick} id="add-favorite-button"><h3>Add to Favorites</h3></button>;
            }
        }
    }

    renderContent() {
        const { display } = this.state;
        if(display === "home") {
            return (
                <div className="grid-home-content">
                    <Mapbox 
                    updateQuery={this.updateQuery} 
                    fetchMap={this.fetchMap}
                    />
                    <div className="grid-home-content-menu-container">
                        {this.renderAddFavorite()}                        
                        <FavoritesList 
                            favorites={this.props.user.favorites}
                            updateCenter={this.updateCenter}
                        />
                    </div>
                </div>
            )
        } else {
            return <Explore updateDisplay={this.updateDisplay} updateCenter={this.updateCenter}/>;
        }
    }

    renderPage() {
        const { user, favorites } = this.props;
        if(user && favorites) {
            return (
                <div className="grid-home">
                    <Sidebar 
                        onSignOutClick={this.props.onSignOutClick}
                        updateDisplay={this.updateDisplay}
                    />
                    {this.renderContent()}
                </div>
            )
        } else {
            return (
                <div>
                    <LoadingFavorites />
                </div>
            )
        }
    }

    render() {
        if (this.props.isSignedIn === false) {
            return <Redirect to="/" />
        }
        else {
            return this.renderPage();
        }
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        id: state.auth.userId,
        user: state.users.user,
        favorites: state.favorites.favorites
    }
}

export default connect(mapStateToProps, { fetchUser, fetchFavorites })(FavoritesHome)