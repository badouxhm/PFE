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
import 'react-leaflet-markercluster/dist/styles.min.css';

const MapAcc = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3002/Wilaya',{headers :{'Authorization': `${sessionStorage.getItem('token')}`}});
                setData(res.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData(); 
    }, []);

    const position = [28.0339, 1.6596];
    const createIcon = (number) => {
        return L.divIcon({
          html: `<div style="background-color: #54d669; border-radius: 50%; padding: 5px; text-align: center;">${number}</div>`,
          className: 'custom-div-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });
      };

    const role = sessionStorage.getItem('role')

    return (
        <>
            {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
            <div className='bg-red-500'>
                <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup>
                        {data && data.map((marker, index) => (
                            <Marker 
                                key={`${index}`} 
                                position={[marker.latitude, marker.longitude]} 
                                icon={createIcon(marker.nbcelles)}
                            >
                                <Popup>{`${marker.name} : ${marker.nbcelles}`}</Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </>
    );
};

export default MapAcc;
