import React from 'react'
import NavBar from '../composants/NavBar'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import "./map.css"
const mapPage = () => {
    const position = [28.536,1.670]
    const liens =[

    ]        
  return (
    <>
    
    <NavBar links={liens}/>
    <div className='m-16 mt-32'>
        <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
        <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
        </Marker>
        </MapContainer>
    </div>
    </>
  )
}

export default mapPage
