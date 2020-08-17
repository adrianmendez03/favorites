import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, fetchUsers, unfetchUser } from '../../actions';

class FavoritesList extends React.Component {

    componentDidMount() {
        // fetches list of users from redux store
        this.props.fetchUsers();
        // remove user from redux store to not hold over information
        this.props.unfetchUser();
    }

    // renders admin button if listed favorite is the current users favorite

    renderAdmin(userId) {
        // user id is passed into React Router Link tag
        if(userId === this.props.currentUserId) {
            return (
                <ul className="admin-content">
                    <li><button className="button nav-item" id="delete-button"><Link to={`/favorites/delete/${this.props.currentUserId}`}>Delete</Link></button></li>
                </ul>
            )
        }
    }

    renderList() {
        if (this.props.users.length > 0) {
            return (
                <div className="content">
                    <h1>Check out Favorites!</h1>
                    <ul className="favorites-list">
                        {this.renderListItems()}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="content">
                    <h1>Check out Favorites!</h1>
                    <h2>Looks like you're the first! Log in to get started</h2>
                </div>
            )
        }
    }

    // maps through list of users to render item

    renderListItems() {
        return this.props.users.map(user => {
            const title =  `${user.username}'s Favorites`;
            return (
                <div className="list-item" key={user._id}>
                    <li className="list-content-container">
                        <div className="list-content">
                            <div className="list-content-text">
                                <h2>{title}</h2>
                            </div>
                            <Link to={{ pathname: `/favorites/view/${user._id}`, state: { id: user._id} }}><i className="fa fa-angle-right list-icon" aria-hidden="true"></i></Link>
                        </div>
                    </li>
                    {this.renderAdmin(user._id)}
                </div>
            )
        })
    }

    render() {

        //prevents undefined error
        if (this.props.users) {
            return (
                this.renderList()
            )
        } else {
            return <div className="content"><h1>Loading . . .</h1></div>
        }
    }
}

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        users: state.users.users
    };
}

export default connect(mapStateToProps, { signIn, fetchUsers, unfetchUser })(FavoritesList);