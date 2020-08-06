import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteUser, signOut } from '../../actions';
import Modal from '../Modal';
import History from '../../History';

class DeleteFavorite extends React.Component {
    renderActions() {
        return (
            <div className="modal-buttons">
                <Link to="/home"><button className="button">Cancel</button></Link>
                <button onClick={() => {
                    this.props.deleteUser(this.props.currentUserId)
                        .then(() => this.props.signOut());
                }} className="button" id="delete-button">Delete</button>
            </div>
        )
    }

    renderContent() {
        if(!this.props.currentUserId) {
            return 'Are you sure you want to delete your Favorites?'
        } else {
            return `Hey ${this.props.name}, are you sure you want to delete your Favorites?`
        }
    }

    render() {
        return (
            <Modal
                header="Delete Favorites"
                text={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => History.push('/home')}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.auth.userId,
        name: state.auth.userName
    }
}

export default connect(mapStateToProps, { deleteUser, signOut })(DeleteFavorite);