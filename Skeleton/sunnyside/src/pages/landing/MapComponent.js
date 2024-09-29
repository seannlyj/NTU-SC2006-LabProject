import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { Icon, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../../styling/MapComponent.css";
import MarkerClusterGroup from 'react-leaflet-cluster';

const MapComponent = () => {
  // Pinned locations should be passed as an array
  const markers = [
    {
        geocode: [1.3521, 103.8198],
        popUp: "Name of activity for location 1"
    },
    {
        geocode: [1.3531, 103.9198],
        popUp: "Name of activity for location 2"
    }
    ];


  const customIcon = new Icon({
    iconUrl: require('../../art/location-icons/location.png'),
    iconSize: [38, 38] // Size of the icon
  })

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: 'custom-marker-cluster',
      iconSize: L.point(40, 40, true),
    });
  }

  const zoomControlRef = useRef(null); // Ref to hold the zoom control

  // Function to handle register button click
  const handleRegister = (location) => {
    alert(`Registered for ${location}`);
    // You can add your logic here, such as calling an API or updating a state
  };
  

  // Custom component to add zoom control to the bottom left
  const CustomZoomControl = () => {
    const map = useMap();
    
    useEffect(() => {
      // Check if the zoom control is already added
      if (!zoomControlRef.current) {
        // Add zoom control at the bottom left
        zoomControlRef.current = L.control.zoom({ position: 'bottomleft' }).addTo(map);
      }

      // remove zoom buttons to prevent duplicate buttons
      return () => {
        if (zoomControlRef.current) {
          map.removeControl(zoomControlRef.current);
          zoomControlRef.current = null; // Reset the ref
        }
      };
    }, [map]);

    return null;
  };

  return (
    <MapContainer center={[1.3521, 103.8198]} zoom={13} style={{ height: "100vh" }} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {markers.map(marker => (
        <Marker position={marker.geocode} icon={customIcon}>
          <Popup>
            <h2>{marker.popUp}</h2>
            <button className="register-button" onClick={() => handleRegister(marker.popUp)}>Register</button>
          </Popup>
        </Marker>
        ))
        };
      </MarkerClusterGroup>
      {/* Add custom zoom control to bottom left */}
      <CustomZoomControl />
    </MapContainer>
  );
};

export default MapComponent;
