import React from 'react';
import { connect } from 'react-redux'
import Axios from 'axios';

import { fetchUser } from '../../actions';

class FavoriteAdmin extends React.Component {

    onClickDelete = (e) => {

        const deleteFavorite =  {
            delete: true,
            id: this.props.signedInUserId,
            favoriteId: this.props.favoriteId,
        }

        Axios.post(`http://localhost:5000/users/update/${this.props.signedInUserId}`, deleteFavorite)
            .then(res => {
                console.log(res.data);
                this.props.fetchUser(this.props.idOfUsersPage)
                alert('Favorite Deleted');
            })
            
    }

    render() {
        console.log(this.props)
        if(this.props.idOfUsersPage === this.props.signedInUserId) {
            return (
                <ul className="admin-content">
                    <li><button onClick={this.onClickDelete} className="button nav-item" id="delete-button">Delete</button></li>
                </ul>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        signedInUserId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchUser })(FavoriteAdmin);