import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, fetchUsers } from '../../actions';

class FavoritesList extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    renderAdmin(userId) {
        if(userId === this.props.currentUserId) {
            return (
                <ul className="admin-content">
                    <li><Link className="nav-item">Edit</Link></li>
                    <li>|</li>
                    <li><Link className="nav-item" id="delete">Delete</Link></li>
                </ul>
            )
        }
    }

    renderList() {
        if(this.props.users) {
            return this.props.users.map(user => {
                const title =  `${user.username}'s Favorites`;
                return (
                    <div className="list-item" key={user._id}>
                        <li className="list-content-container">
                            <div className="list-content">
                                <div className="list-content-text">
                                    <h2>{title}</h2>
                                </div>
                                <Link><i className="fa fa-angle-right list-icon" aria-hidden="true"></i></Link>
                            </div>
                        </li>
                        {this.renderAdmin(user._id)}
                    </div>
                )
            })
        }
    }

    render() {
        {this.props.fetchUsers()}
        return (
            <div className="content">
                <h1>Check out Favorites!</h1>
                <ul className="favorites-list">
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        users: state.users.users
    };
}

export default connect(mapStateToProps, { signIn, fetchUsers })(FavoritesList);