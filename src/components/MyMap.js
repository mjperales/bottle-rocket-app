import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        const { lat, lng, title } = this.props;
        return (
            <Map
                google={this.props.google}
                zoom={10}
                style={style}
                initialCenter={{
                    lat: 32.78306,
                    lng: -96.80667,
                }}
            >
                <Marker title={title} name={title} position={{ lat: lat, lng: lng }} />
            </Map>
        );
    }
}

const style = {
    width: '100%',
    height: '400px',
};

export default GoogleApiWrapper((props) => ({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
}))(MapContainer);
