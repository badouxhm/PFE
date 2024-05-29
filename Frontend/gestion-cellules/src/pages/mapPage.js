import React, { useEffect, useState } from 'react';
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import "./map.css";
import 'leaflet/dist/leaflet.css';
import GreenIcon from "../assets/epingle-2.png";
import RedIcon from "../assets/epingle.png";
import 'react-leaflet-markercluster/dist/styles.min.css';

const MapPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3002/map',{headers :{'Authorization': `${sessionStorage.getItem('token')}`}});
                setData(res.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData(); 
    }, []);

    const position = [36.7372, 3.0877];

    const greenIcon = L.icon({
        iconUrl: GreenIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const redIcon = L.icon({
        iconUrl: RedIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const role = sessionStorage.getItem('role')

    return (
        <>
            {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
            <div className='m-16 mt-32'>
                <MapContainer center={position} zoom={7} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup>
                        {data && data.map((marker, index) => (
                            <Marker 
                                key={index} 
                                position={[marker.Y, marker.X]} 
                                icon={marker.Site_status === '1' ? greenIcon : redIcon}
                            >
                                <Popup>{marker.id_c}</Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </>
    );
};

export default MapPage;
