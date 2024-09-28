import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { popup, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../../styling/MapComponent.css";

const MapComponent = () => {
  // Pinned locations should be passed as an array
  const markers = [
    {
        geocode: [1.3521, 103.8198],
        popUp: "Test description for location 1"
    },
    {
        geocode: [1.3531, 103.9198],
        popUp: "Test description for location 2"
    }
    ];


  const customIcon = new Icon({
    iconUrl: require('../../art/location-icons/location.png'),
    iconSize: [38, 38] // Size of the icon
  })
  const zoomControlRef = useRef(null); // Ref to hold the zoom control
  

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
      {markers.map(marker => (
      <Marker position={marker.geocode} icon={customIcon}>
      </Marker>
      ))
      };

      {/* Add custom zoom control to bottom left */}
      <CustomZoomControl />
    </MapContainer>
  );
};

export default MapComponent;
