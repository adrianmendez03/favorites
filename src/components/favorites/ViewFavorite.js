import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Mapbox from '../Mapbox';

import FavoriteAdmin from './FavoriteAdmin';
import { fetchUser } from '../../actions';

class ViewFavorite extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idOfUsersPage: null,
            favoriteId: null,
            coord: {},
            name: null,
            location: null, 
            description: null
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.location.state.id);
        this.setState({ idOfUsersPage: this.props.location.state.id });
    }

    updateQuery = item => {
        this.setState({
            coord: item.geometry.coordinates,
            name: item.text,
            location: item.place_name,
            description: item.properties.category
        })
    }

    onClick = (e) => {
        const newFavorite =  {
            id: this.props.signedInUserId,
            coord: this.state.coord,
            name: this.state.name,
            location: this.state.location,
            description: this.state.description
        }

        console.log(newFavorite);

        Axios.post(`http://localhost:5000/users/update/${this.props.signedInUserId}`, newFavorite)
            .then(res => {
                console.log(res.data);
                this.props.fetchUser(this.props.location.state.id);
                this.setState({
                    coord: {},
                    name: null,
                    location: null,
                    description: null
                });
                alert('Favorite added!');
            })
    }

    renderAddFavorite(idOfUsersPage) {
        if(idOfUsersPage === this.props.signedInUserId) {
            if (this.state.name === null) {
                return null;
            } else {
                return <button onClick={this.onClick} className="button" id="add-favorite-button">Add to Favorites</button>;
            }
        }
    }

    renderListItems() {
        console.log(this.state.idOfUsersPage)
        return this.props.user.favorites.map(favorite => {

            const title =  `${favorite.name}`;
            const location = `${favorite.location}`;
            const description = `${favorite.description}`

            return (
                <div className="list-item" key={favorite.name}>
                    <li className="list-content-container">
                        <div className="list-content">
                            <div className="list-content-text">
                                <h2>{title}</h2>
                                <h4>{location}</h4>
                                <h3>{description}</h3>
                            </div>
                        </div>
                    </li>
                    <FavoriteAdmin favoriteId={favorite._id} idOfUsersPage={this.state.idOfUsersPage}/>
                </div>
            )
        })
    }

    renderList() {
        const { username } = this.props.user

        if (this.props.user.favorites) {
            if (this.props.user.favorites.length > 0) {
                return (
                    <div className="user-content">
                        <h1>{`${username}'s Favorites'`}</h1>
                        <ul className="favorites-list">
                            {this.renderListItems()}
                        </ul>
                    </div>
                )
            } else {
                return (
                    <div className="user-content">
                        <h1>{`${username}'s Favorites`}</h1>
                        <h2>{`${username} doesn't have anything to share right now!`}</h2>
                    </div>
                )
            }
        }
    }

    renderComponent() {
        if (this.props.user) {
            return (
                <React.Fragment>
                    <Mapbox callBack={this.updateQuery}/>
                    {this.renderAddFavorite(this.props.location.state.id)}
                    {this.renderList()}
                </React.Fragment>
            )
        } else {
            return <div className="content"><h1>Loading . . .</h1></div>
        } 
    }

    render() {
        return this.renderComponent();
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        signedInUserId: state.auth.userId,
        user: state.users.user
    }
}

export default connect(mapStateToProps, { fetchUser })(ViewFavorite);