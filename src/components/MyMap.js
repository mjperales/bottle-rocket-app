import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={style}
                // initialCenter={{
                //     lat: { lat },
                //     lng: { lng },
                // }}
            >
                {/* <Marker title={title} name={title} position={{ lat: lat, lng: lng }} /> */}
            </Map>
        );
    }
}

// const { lat, lng, title } = this.props;
const style = {
    width: '100%',
    height: '180px',
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCb1Ou94fNNNk08A2RhaRJeyXAN4sj8jMc',
})(MapContainer);
