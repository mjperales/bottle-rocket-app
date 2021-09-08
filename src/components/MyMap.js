import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

function MapContainer({ lat, lng, title, google }) {
    return (
        <Map
            google={google}
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

const style = {
    width: '100%',
    height: '400px',
};

export default GoogleApiWrapper((props) => ({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
}))(MapContainer);
