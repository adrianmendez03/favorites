import React from 'react';
import { connect } from 'react-redux';

class Explore extends React.Component {

    renderDescriptionTags(description) {
        var descArr = description.split(", ")
        return descArr.map(tag => {
            return <div className="card-item-tag" key={tag}>{tag}</div>
        })
    }

    renderCards() {
        let key = 0;
        let tabindex = 4;
        return this.props.favorites.map(favorite => {
            var start = favorite.location.indexOf(", ") + 1; 
            var location = favorite.location.slice(start, favorite.location.length);
            tabindex++;
            key++;
            return (
                <div className="card" key={key} tabIndex={tabindex} onClick={() => {
                    this.props.updateDisplay("home");
                    setTimeout(() => this.props.updateCenter(favorite.coord), 750)
                }}>
                    <div className="card-header">
                        <h4>{`${key}.`}</h4>
                        <div className="card-title">
                            <h3>{favorite.name}</h3>
                            <p>{location}</p>
                        </div>
                    </div> 
                    <div className="card-tag-container">
                        {this.renderDescriptionTags(favorite.description)}
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="explore-container">
                <div className="explore-header">
                    <h1>Explore.</h1>
                </div>
                <div className="cards-container">
                    {this.renderCards()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        favorites: state.favorites.favorites
    }
}

export default connect(mapStateToProps)(Explore);