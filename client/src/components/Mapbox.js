import React from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;

class Mapbox extends React.Component {

    state = {
        center: [-90, 38],
        zoom: 3.25
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/adrianmendez03/ckddwuvck4igk1jt7ago8v0kz',
            center: this.state.center,
            zoom: this.state.zoom
        });

        this.map = map;

        this.props.fetchMap(map);

        const favorites = this.props.user.favorites;

        this.renderMarkers(favorites, map);

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            getItemValue: item => {
                this.props.updateQuery(item);
                return item.place_name;
            }
        });

        map.addControl(geocoder);

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }),
        );

    }

    componentDidUpdate() {
        const user = this.props.user;

        this.renderMarkers(user.favorites, this.map)
    }
    
    renderMarkers(favorites, map) {
        if (favorites) {
            return favorites.map(favorite => {
                new mapboxgl.Marker({ color: '#474bb3'})
                    .setLngLat([favorite.coord[0], favorite.coord[1]])
                    .addTo(map);
            })
        }
    }

    renderMap() {
        return (
            <div ref={el => this.mapContainer = el} className="map-container"/>
        )
    }

    render() {
        return this.renderMap()
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
}

export default connect(mapStateToProps)(Mapbox);