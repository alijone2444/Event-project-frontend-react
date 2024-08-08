import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Skeleton from 'react-loading-skeleton';
import marker from '../../images/symbol.png';
import locationNotFound from '../../images/locationNotFound.png';

import { Icon } from 'leaflet';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const defaultLocation = {
    lat: 33.5890,
    lng: 73.0450,
};

const MapComponent = ({ locationName }) => {
    const myIcon = new Icon({
        iconUrl: marker,
        iconSize: [32, 32],
    });
    const myNolocationIcon = new Icon({
        iconUrl: locationNotFound,
        iconSize: [32, 32],
    });
    const [coordinates, setCoordinates] = useState(null); // Initial state as null
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: locationName,
                        format: 'json',
                        polygon: 1,
                        addressdetails: 1,
                    },
                });

                const location = response.data[0];
                if (location) {
                    setCoordinates({
                        lat: parseFloat(location.lat),
                        lng: parseFloat(location.lon),
                    });
                    setError(null);
                } else {
                    setCoordinates(defaultLocation); // Set default location if not found
                    setError('Location not found.');
                }
            } catch (error) {
                setCoordinates(defaultLocation); // Set default location if there's an error
                setError('Error fetching location.');
            }
        };

        fetchCoordinates();
    }, [locationName]);

    return (
        <div style={{ marginTop: '5%' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {coordinates === null ? (
                <Skeleton height={400} width="100%" />
            ) : (
                <MapContainer center={coordinates} zoom={13} style={containerStyle} scrollWheelZoom={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={coordinates} icon={!error ? myIcon : myNolocationIcon}>
                        <Popup>
                            {locationName || 'Default Location'} <br /> Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default MapComponent;
