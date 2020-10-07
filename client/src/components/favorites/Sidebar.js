import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as LogoText } from '../../images/text.svg';

class Sidebar extends React.Component {

    state = { showLogout: null }

    renderGoogle(name, picture) {
        if (this.state.showLogout) {
            return (
                <div 
                    className="account-modal" 
                    onClick={() => this.setState({ showLogout: null })}
                    onBlur={() => this.setState({ showLogout: false })}
                >
                    <div className="account-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="account-modal-content-header">
                            <img src={picture} alt={name}/>
                            <h3>{name}</h3>
                        </div>
                        <div
                            tabIndex="5" 
                            className="account-modal-content-body" 
                            onClick={this.props.onSignOutClick}
                        >
                            {`Logout as ${name}`}
                        </div>
                    </div>
                </div>
            )
        }
    }
    
    renderAccountButton(name, picture) {
        if (name && picture) {
            return (
                <div 
                    id="account-button" 
                    tabIndex="4" 
                    onFocus={() => this.setState({ showLogout: true })} 
                >
                    <img src={picture} alt={name}/>
                    <h3>{name}</h3>
                </div>
            )
        } else return null;
    }

    renderSideBar() {
        const { profilePicture, signedInUserName } = this.props;
        return (
            <div className="grid-home-sidebar">
                <LogoText id="sidebar-logo"/>
                <ul className="sidebar-list">
                    <li className="sidebar-list-item" tabIndex="1" onClick={() => this.props.updateDisplay("home")}><h1>Home.</h1></li>
                    <li className="sidebar-list-item" tabIndex="2" onClick={() => this.props.updateDisplay("explore")}><h1>Explore.</h1></li>
                </ul>
                {this.renderGoogle(signedInUserName, profilePicture)}
                {this.renderAccountButton(signedInUserName, profilePicture)}
            </div>
        )
    }

    render() {
        return this.renderSideBar();
    }
}

const mapStateToProps = state => {
    return {
        signedInUserName: state.auth.userName,
        profilePicture: state.auth.profilePicture
    }
}

export default connect(mapStateToProps)(Sidebar);