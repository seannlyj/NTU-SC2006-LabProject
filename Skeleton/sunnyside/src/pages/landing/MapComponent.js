import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styling/MapComponent.css";
import MarkerClusterGroup from "react-leaflet-cluster";

const MapComponent = ({ selectedActivity }) => {
  // Pinned locations should be passed as an array
  const markers = [
    {
      geocode: [1.3521, 103.8198],
      popUp: "Gym",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      image: require("../../art/activity-thumbnails/indoor-yoga.jpg"),
    },
    {
      geocode: [1.3531, 103.8199],
      popUp: "Indoor Yoga",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      image: require("../../art/activity-thumbnails/indoor-yoga.jpg"),
    },
    {
      geocode: [1.3541, 103.82],
      popUp: "Boxing Gym",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      image: require("../../art/activity-thumbnails/indoor-yoga.jpg"),
    },
    {
      geocode: [1.3551, 103.8201],
      popUp: "Swimming Pool",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      image: require("../../art/activity-thumbnails/indoor-yoga.jpg"),
    },
  ];

  const customIcon = new Icon({
    iconUrl: require("../../art/location-icons/location.png"),
    iconSize: [38, 38], // Size of the icon
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: L.point(40, 40, true),
    });
  };

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
      if (selectedActivity && selectedActivity.geocode) {
        map.setView(selectedActivity.geocode, 20);
      }
      // Check if the zoom control is already added
      if (!zoomControlRef.current) {
        // Add zoom control at the bottom left
        zoomControlRef.current = L.control
          .zoom({ position: "bottomleft" })
          .addTo(map);
      }

      // remove zoom buttons to prevent duplicate buttons
      return () => {
        if (zoomControlRef.current) {
          map.removeControl(zoomControlRef.current);
          zoomControlRef.current = null; // Reset the ref
        }
      };
    }, [selectedActivity, map]);

    return null;
  };

  return (
    <MapContainer
      center={[1.3521, 103.8198]}
      zoom={13}
      style={{ height: "100vh" }}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>
              <div className="popup-content">
                <img
                  src={marker.image}
                  alt={marker.popUp}
                  className="popup-image"
                />
                <div className="popup-details">
                  <h2 className="popup-title">{marker.popUp}</h2>
                  <p className="popup-description">{marker.description}</p>
                  <button
                    className="log-button"
                    onClick={() => handleRegister(marker.popUp)}
                  >
                    Log Activity
                  </button>
                  <p className="rating-maintext">Rate the activity!<br></br>(1-Horrible, 5-Amazing)</p>
                  <div className="rating-slider">
                    <label>{marker.rating}</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      defaultValue={marker.rating}
                      onChange={(e) =>
                        console.log(
                          `New rating for ${marker.popUp}: ${e.target.value}`
                        )
                      }
                    />
                    <div className = "rating-labels">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                  </div>
                  <button
                    className="rating-button"
                    onClick={() => handleRegister(marker.popUp)}
                  >
                    Rate Activity
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        ;
      </MarkerClusterGroup>
      {/* Add custom zoom control to bottom left */}
      <CustomZoomControl />
    </MapContainer>
  );
};

export default MapComponent;
