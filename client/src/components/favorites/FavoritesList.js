import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import { fetchUser, fetchFavorites } from '../../actions';

class FavoritesList extends React.Component {

    state = { 
        displayList: false, 
        displayModal: false,
        activeId: null 
    }

    onClickDelete = (favoriteId) => {
        const deleteFavorite =  {
            delete: true,
            id: this.props.userId,
            locationId: favoriteId,
        }
        Axios.post(`https://salty-tor-91484.herokuapp.com/users/update/${this.props.userId}`, deleteFavorite)
            .then(res => {
                console.log(res.data);
                this.props.fetchUser(this.props.userId);
                Axios.post(`https://salty-tor-91484.herokuapp.com/favorites/update/${this.props.locationId}`, deleteFavorite)
                    .then(res => {
                        console.log(res.data);
                        this.props.fetchFavorites()
                        alert("Favorite Deleted")
                    })
            })
            
    }

    changeModalDisplay = () => {
        this.setState({ displayModal: false})
    }

    changeListDisplayOnClick = () => {
        if (this.state.displayList) {
            this.setState({ displayList: false, activeId: null })
        } else {
            this.setState({ displayList: true })
        }
    }

    renderDescriptionTags(description) {
        var descArr = description.split(", ")
        return descArr.map(tag => {
            return <div className="favorites-list-item-tag" key={tag}>{tag}</div>
        })
    }
    
    renderListItemHeader(favorite) {
        if (favorite._id === this.state.activeId) {
            var start = favorite.location.indexOf(", ") + 1; 
            var location = favorite.location.slice(start, favorite.location.length);
            return (
                <div className="favorites-list-item-header">
                    <div className="favorites-list-item-header-left">
                        <h4>{favorite.name}</h4>
                        <p>{location}</p>
                    </div>
                    <div className="favorites-list-item-header-right" onClick={() => this.onClickDelete(favorite._id)}>
                        <h2>x</h2>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="favorites-list-item-header">
                    <div className="favorites-list-item-header-left">
                        <h4>{favorite.name}</h4>
                    </div>
                </div>
            )
        }
    }

    renderListItemContent(favorite) {
        if (favorite._id === this.state.activeId) {
            return (
                <div className="favorites-list-tag-container">
                    {this.renderDescriptionTags(favorite.description)}
                </div>
            )   
        } else return null;
    }

    renderListItems() {
        const { favorites } = this.props;
        var tabindex = 6;

        if (this.state.displayList) {
            if (favorites.length > 0) {
                return this.props.favorites.map(favorite => {
                    ++tabindex;
                    return (
                        <div 
                            className="favorites-list-item" 
                            key={favorite._id} 
                            tabIndex={tabindex.toString()}
                            onClick={() => {
                                this.setState({ activeId: favorite._id });
                                this.props.updateCenter(favorite.coord);
                            }} 
                        >   
                            {this.renderListItemHeader(favorite)}
                            {this.renderListItemContent(favorite)}
                        </div>
                    )
                })
            } else {
                return (
                    <div className="inactive favorites-list-item">
                        You currently don't have any favorites.
                    </div>
                )
            }
        } 
        else return null;
    }

    renderList() {
        return ( 
            <div 
                className="favorites-list-container"
            >
                <div 
                    className="favorites-list-header"
                    onFocus={this.changeListDisplayOnClick}
                    onClick={this.changeListDisplayOnClick}
                    tabIndex="6"
                >
                    <h2>favorites</h2>
                </div>
                <div className="favorites-list-body">
                    {this.renderListItems()}
                </div>
            </div>
        )
    }

    render() {
        return this.renderList()
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchUser, fetchFavorites })(FavoritesList);