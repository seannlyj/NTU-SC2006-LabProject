import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon, divIcon, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styling/MapComponent.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";
import CustomModal from "./CustomModal";

const MapComponent = ({ selectedActivity, markerData , email, latitude, longitude }) => {
  // Pinned locations should be passed as an array
  const defaultMarkers = [
    {
      geocode: [1.3521, 103.8198],
      popUp: "Gym",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      image: require("../../art/activity-thumbnails/indoor-yoga.jpg"),
      activity: "Martial Arts", // Specify activity type
      indoorOutdoor: "outdoor", // Specify whether it's indoors or outdoors
    },
    {
      geocode: [1.3531, 103.8199],
      popUp: "Indoor Yoga",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      image: require("../../art/activity-thumbnails/indoor-yoga.jpg"),
      activity: "Yoga", // Specify activity type
      indoorOutdoor: "indoor", // Specify whether it's indoors or outdoors
    },
    {
      geocode: [1.3541, 103.82],
      popUp: "Boxing Gym",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      image: require("../../art/activity-thumbnails/indoor-yoga.jpg"),
      activity: "Martial Arts", // Specify activity type
      indoorOutdoor: "indoor", // Specify whether it's indoors or outdoors
    },
    {
      geocode: [1.3551, 103.8201],
      popUp: "Swimming Pool",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      image: require("../../art/activity-thumbnails/indoor-yoga.jpg"),
      activity: "Swimming", // Specify activity type
      indoorOutdoor: "outdoor", // Specify whether it's indoors or outdoors
    },
  ];

  const [markers, setMarkers] = useState(markerData || defaultMarkers);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isInteractingWithMarker, setIsInteractingWithMarker] = useState(false);
  const [newRating, setNewRating] = useState(null);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [hasZoomed, setHasZoomed] = useState(false);

  useEffect(() => {
    if (markerData) {
      setMarkers(markerData);
    }
  }, [markerData]);

  useEffect(() => {
    if (selectedMarker) {
      setLat(selectedMarker.geocode[0].toString());
      setLong(selectedMarker.geocode[1].toString());
      setNewRating(selectedMarker.rating);
    }
  }, [selectedMarker]);

  const iconWidth = 100;
  const iconHeight = 100;
  // Creating icons for indoor and outdoor activities
  const customIcon = new Icon({
    iconUrl: require("../../art/location-icons/user_marker.PNG"),
    iconSize: [60, 60], // Size of the icon
  });

  const basketBallInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_basketball_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const basketBallOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_basketball_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const boulderingInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_bouldering_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const boulderingOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_bouldering_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const cyclingInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_cycling_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const cyclingOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_cycling_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const hikingInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_hiking_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const hikingOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_hiking_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const martialArtsInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_martialarts_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const martialArtsOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_martialarts_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const runningInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_running_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const runningOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_running_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const soccerInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_soccer_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const soccerOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_soccer_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const swimmingInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_swimming_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const swimmingOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_swimming_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const yogaInIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_yoga_indoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const yogaOutIcon = new Icon({
    iconUrl: require("../../art/location-icons/activity_yoga_outdoor.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
  });

  const getActivityIcon = (activity, indoorOutdoor) => {
    switch (activity) {
      case "Basketball":
        return indoorOutdoor === "indoor"
          ? basketBallInIcon
          : basketBallOutIcon;
      case "Bouldering":
        return indoorOutdoor === "indoor"
          ? boulderingInIcon
          : boulderingOutIcon;
      case "Cycling":
        return indoorOutdoor === "indoor" ? cyclingInIcon : cyclingOutIcon;
      case "Hiking":
        return indoorOutdoor === "indoor" ? hikingInIcon : hikingOutIcon;
      case "Martial Arts":
        return indoorOutdoor === "indoor"
          ? martialArtsInIcon
          : martialArtsOutIcon;
      case "Running":
        return indoorOutdoor === "indoor" ? runningInIcon : runningOutIcon;
      case "Soccer":
        return indoorOutdoor === "indoor" ? soccerInIcon : soccerOutIcon;
      case "Swimming":
        return indoorOutdoor === "indoor" ? swimmingInIcon : swimmingOutIcon;
      case "Yoga":
        return indoorOutdoor === "indoor" ? yogaInIcon : yogaOutIcon;
      default:
        return customIcon; // Default icon if activity doesn't match
    }
  };

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: L.point(40, 40, true),
    });
  };

  const getActivityImage = (activity, indoorOutdoor) => {
    switch (activity) {
      case "Basketball":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-basketball.jpg")
          : require("../../art/activity-thumbnails/outdoor-basketball.jpg");
      case "Bouldering":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-bouldering.jpg")
          : require("../../art/activity-thumbnails/outdoor-bouldering.jpg");
      case "Cycling":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-cycling.jpg")
          : require("../../art/activity-thumbnails/outdoor-cycling.jpg");
      case "Hiking":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-hiking.jpg")
          : require("../../art/activity-thumbnails/outdoor-hiking.jpg");
      case "Martial Arts":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-martialarts.jpg")
          : require("../../art/activity-thumbnails/outdoor-martialarts.jpg");
      case "Running":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-running.jpg")
          : require("../../art/activity-thumbnails/outdoor-running.jpg");
      case "Soccer":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-soccer.jpg")
          : require("../../art/activity-thumbnails/outdoor-soccer.jpg");
      case "Swimming":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-swimming.jpg")
          : require("../../art/activity-thumbnails/outdoor-swimming.jpg");
      case "Yoga":
        return indoorOutdoor === "indoor"
          ? require("../../art/activity-thumbnails/indoor-yoga.jpg")
          : require("../../art/activity-thumbnails/outdoor-yoga.jpg");
      default:
        return require("../../art/activity-thumbnails/indoor-yoga.jpg");
    }
  };

  const zoomControlRef = useRef(null); // Ref to hold the zoom control

  // Function to handle register button click (added logging of activity)
  
  const handleRegister = async (location) => {
    console.log(email);
    // alert(`Registered for ${location}`);
    // You can add your logic here, such as calling an API or updating a state
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with leading zero
    const year = currentDate.getFullYear(); // Get full year
    
    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate); // Outputs: DD-MM-YYYY
    
    // Format the date to "YYYY-MM-DD" using toLocaleDateString
    //const formattedDate = currentDate.toLocaleDateString('en-CA'); // 'en-CA' gives the date in "YYYY-MM-DD" format
    

    const loggedActivity = {
      activityName: location, // "location" is the activity name
      date: formattedDate,
      time: currentDate.toLocaleTimeString(),
    };

    //setModalMessage(`⚠️ DANGER ALERT: Weather has changed to ${currentWeather}!`);
    //setIsModalOpen(true);
    alert(`Logged activity: ${location}`);
    console.log(loggedActivity);
    
    try {
      // Make a request to update the user's activity log in the backend
      await axios.patch(`/api/users/${email}`, {
        activitylog: loggedActivity,
      });
   
    } catch (error) {
      console.error("Failed to log activity:", error);
    }
  
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

  const handleRating = async(e) => {
    // e.preventDefault(); // Prevent default form submission

    const data = {lat: lat, long:long, rating:newRating};

    console.log("Entered location is", data);

    try {

      const response = await axios.patch('/api/activities/', data);
      setNewRating(null); // reset rating value

    } catch (error) {
      const message = error.response?.data?.message || 'Error. Please try again';
      alert(message);
    }

  }


  const CenterMapOnCurrentLocation = () => {
    const map = useMap(); // Get the map instance

    useEffect(() => {
      if (!hasZoomed && latitude && longitude) {
        map.setView([latitude, longitude], 13); // Set the view to the current location with zoom level 13
        setHasZoomed(true); // Mark that the zooming has occurred
      }
    }, [latitude, longitude, map, hasZoomed]);

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
          <Marker
            key={marker.popUp} // Unique key for each marker
            position={marker.geocode}
            icon={getActivityIcon(marker.activity, marker.indoorOutdoor)}

            eventHandlers={{
              click: () => {
                setSelectedMarker(marker);
                setIsInteractingWithMarker(true); // Set this to true when a marker is clicked
              }
            }}
          >
            <Popup>
              <div className="popup-content">
                <img
                  src={getActivityImage(marker.activity, marker.indoorOutdoor)}
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


                  <p className="rating-maintext">
                    Rate the activity!<br></br>(1-Horrible, 5-Amazing)
                  </p>
                  <div className="rating-slider">
                    <label>Rating: {marker.rating}</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      defaultValue={marker.rating}
                      onChange={(e) => {
                        console.log(`New rating for ${marker.popUp}: ${e.target.value}`)
                        setNewRating(e.target.value);
                        setMarkers((prevMarkers) =>
                          prevMarkers.map((m) =>
                            m.popUp === marker.popUp ? { ...m, rating: e.target.value } : m
                          )); 
                        }
                      }
                      
                        onMouseEnter={() => setSelectedMarker(marker)} // Set selected marker when hovering
                        onMouseLeave={() => setSelectedMarker(null)} // Reset when not hovering

                    />
                    <div className="rating-labels">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                  </div>
                  <button
                    className="rating-button"
                    onClick={() => {
                      setLat(marker.geocode[0].toString());
                      setLong(marker.geocode[1].toString());
                      setNewRating(newRating || marker.rating);

                      handleRating()
                      setIsInteractingWithMarker(false); // Reset this after rating is submitted
                    }}
                  >
                    Rate Activity
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Add marker to indicate user's position */}
      {latitude && longitude && (
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>Your Current Location</Popup>
        </Marker>
      )}

      <CenterMapOnCurrentLocation />
      {/* Add custom zoom control to bottom left */}
      <CustomZoomControl />
    </MapContainer>
  );
};

export default MapComponent;
