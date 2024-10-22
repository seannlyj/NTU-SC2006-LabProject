import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon, divIcon, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styling/MapComponent.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";

const MapComponent = ({ selectedActivity, markerData , email }) => {
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
  const [newRating, setNewRating] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  useEffect(() => {
    if (markerData) {
      setMarkers(markerData);
    }
  }, [markerData]);

  const iconWidth = 100;
  const iconHeight = 100;
  // Creating icons for indoor and outdoor activities
  const customIcon = new Icon({
    iconUrl: require("../../art/location-icons/location.png"),
    iconSize: [iconWidth, iconHeight], // Size of the icon
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

    const data = {lat:"1.3415", long:"103.676", rating:newRating};

    console.log("Entered location is", data);

    try {

      const response = await axios.patch('/api/activities/', data);

    } catch (error) {
      const message = error.response?.data?.message || 'Error. Please try again';
      alert(message);
    }

  }

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
          >
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


                  <p className="rating-maintext">
                    Rate the activity!<br></br>(1-Horrible, 5-Amazing)
                  </p>
                  <div className="rating-slider">
                    <label>{marker.rating}</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      defaultValue={marker.rating}
                      onChange={(e) => {
                        console.log(`New rating for ${marker.popUp}: ${e.target.value}`)
                        setLat(marker.geocode[0].toString());
                        setLong(marker.geocode[1].toString());
                        setNewRating(e.target.value);
                        }
                      }
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
                    onClick={() => handleRating()}
                  >
                    Rate Activity
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      {/* Add custom zoom control to bottom left */}
      <CustomZoomControl />
    </MapContainer>
  );
};

export default MapComponent;
