import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFubWVuZGV6MDMiLCJhIjoiY2tjemRvbWVtMGl0ZTJ0cWliNGI2MGs1NCJ9.qNpxejX7dRZmqHRtlwIbFg';

class Mapbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -90,
            lat: 38,
            zoom: 3,
            term: ''
        }
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/adrianmendez03/ckddwuvck4igk1jt7ago8v0kz',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }),
        );

        
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            getItemValue: item => {
                this.props.callBack(item);
                return item.place_name;
            }
        });

        map.addControl(geocoder);

        console.log(geocoder.getItemValue)

    }

    renderMap() {
        return (
            <div className="map-grid">
                <div ref={el => this.mapContainer = el} className="map-container"/>
            </div>
        )
    }

    render() {
        return this.renderMap()
    }
}

export default Mapbox;