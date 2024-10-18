import "../../styling/Landing.css";
import ProfileButton from "./ProfileButton.js";
import TemperatureDisplayPanel from "./TemperatureDisplayPanel.js";
import SettingsPanel from "./SettingsPanel.js";
import EditProfilePanel from "./EditProfilePanel.js";
import MapComponent from "./MapComponent"; // Import the MapComponent
import HintPanel from "./HintPanel.js";
import { getRecommendedActivities } from "./ActivityRecommendation.js";
import React, { useState, useEffect } from "react";

const Landing = () => {
  //FOR TESTING, TO REMOVE AFTER DONE TESTING RECOMMENDED ACTIVITIES
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

  //Settings Panel
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toggle the side panel open or close
  const toggleSettingsPanel = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  //Edit Profile Panel
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Toggle the side panel open or close
  const toggleEditProfilePanel = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
  };

  //User related variables
  const [preferences, setPreferences] = useState([
    "Martial Arts",
    "Yoga",
    "Swimming",
  ]);

  //Weather related variables
  const [weather, setWeather] = useState("Fair(Day)"); // Set variable for weather icon and set it's default to cloud
  const [weatherName, setWeatherName] = useState("Fair(Day)");
  const [weatherCutoffTime, setWeatherCutoffTime] = useState("11:30 to 13:30");
  const [temperature, setTemperature] = useState("0");
  const [location, setLocation] = useState("ANG MO KIO");

  //Activity related variables
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null); //For activity panel (To display selected activity when user clicks on one of the activities in TemperatureDisplayPanel)
  const [recommendedActivities, setRecommendedActivities] = useState([]);

  // GPS location states
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [geoError, setGeoError] = useState(null); // To store geolocation errors

  // useEffect to get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setGeoError(null); // Reset error if geolocation is successful
        },
        (error) => {
          console.error(
            "Unable to retrieve location, setting default location"
          );
          setLatitude(1.3521); // Default to Singapore's latitude
          setLongitude(103.8198); // Default to Singapore's longitude
        }
      );
    } else {
      setGeoError("Geolocation is not supported by your browser.");
    }
  }, []);

  // useEffect to get recommended activities after fetching all necessary data
  useEffect(() => {
    if (activities.length > 0 && weather && preferences.length >= 0) {
      const recommended = getRecommendedActivities(
        defaultMarkers,
        preferences,
        weather
      );
      setRecommendedActivities(recommended);
    }
  }, [activities, weather, preferences]);

  // useEffect to fetch data after getting latitude and longitude
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      // Fetch weather, location, and nearby activities when location is available
      fetchWeatherData(latitude, longitude);
      fetchLocationData(latitude, longitude);
      fetchNearbyActivities(latitude, longitude);
    }
  }, [latitude, longitude]);

  const fetchWeatherData = async (lat, lon) => {
    const weatherData = await fetchWeatherFromAPI(lat, lon);
    setWeather(weatherData.weather);
    setTemperature(`${weatherData.temperature}`);
    setWeatherCutoffTime(weatherData.cutOffTiming);

    switch (weatherData.weather) {
      case "Fair (Day)":
      case "Fair":
      case "Fair (Night)":
        setWeatherName("FAIR");
        break;
      case "Warm":
        setWeatherName("WARM");
        break;
      case "Partly Cloudy":
      case "Cloudy":
      case "Partly Cloudy (Day)":
      case "Partly Cloudy (Night)":
        setWeatherName("CLOUDY");
        break;
      case "Hazy":
      case "Slightly Hazy":
        setWeatherName("HAZY");
        break;
      case "Mist":
        setWeatherName("MISTY");
        break;
      case "Fog":
        setWeatherName("FOGGY");
        break;
      case "Windy":
        setWeatherName("WINDY");
        break;
      case "Passing Showers":
      case "Light Showers":
      case "Showers":
      case "Heavy Showers":
        setWeatherName("SHOWERS");
        break;
      case "Light Rain":
      case "Moderate Rain":
      case "Heavy Rain":
        setWeatherName("RAINY");
        break;
      case "Thundery Showers":
      case "Heavy Thundery Showers":
      case "Heavy Thunder Showers with Gusty Wind":
        setWeatherName("THUNDERSTORM");
        break;
      default:
        setWeatherName("ERROR");
        break;
    }
  };

  const fetchLocationData = async (lat, lon) => {
    const locationData = await fetchLocationFromAPI(lat, lon);
    setLocation(locationData.location);
  };

  const fetchNearbyActivities = async (lat, lon) => {
    const activitiesData = await fetchActivitiesFromAPI(lat, lon);
    setActivities(activitiesData.activities);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <div className="Landing">
      <div className="header">
        <ProfileButton toggleSettingsPanel={toggleSettingsPanel} />
        <HintPanel weather={weather} />
      </div>
      <div className="content-container">
        <div className="map-wrapper">
          <MapComponent
            selectedActivity={selectedActivity}
            markerData={recommendedActivities} // Pass recommended activities as markerData
          />
        </div>
        <TemperatureDisplayPanel
          weather={weather}
          weatherName={weatherName}
          weatherCutoffTime={weatherCutoffTime}
          temperature={temperature}
          location={location}
          activities={activities}
          onActivityClick={handleActivityClick} // Pass the handler
        />
        {geoError && <p className="geo-error">{geoError}</p>}{" "}
        {/* Display geolocation error */}
        <SettingsPanel
          isOpen={isSettingsOpen}
          toggleSettingsPanel={toggleSettingsPanel}
          toggleEditProfilePanel={toggleEditProfilePanel}
          preferences={preferences}
        />
        <EditProfilePanel
          isOpen={isEditProfileOpen}
          toggleEditProfilePanel={toggleEditProfilePanel}
          preferences={preferences}
          setPreferences={(newPreferences) => {
            setPreferences(newPreferences);
          }}
        />
      </div>
    </div>
  );
};

// Mock API functions
//Modify variables here to test different weather conditions
async function fetchWeatherFromAPI(lat, lon) {
  // Haversine formula to calculate distance between two points
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  let closestArea = null;
  let closestDistance = Infinity;
  let forecastForClosest = null;
  let closestTempStation = null;
  let closestTempDeviceId = null;
  let closestTempDistance = Infinity;
  let temperatureForClosest = null;

  try {
    // Fetch 2-hour weather forecast data
    const weatherResponse = await fetch(
      "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
    );
    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    // Fetch air temperature data
    const tempResponse = await fetch(
      "https://api-open.data.gov.sg/v2/real-time/api/air-temperature"
    );
    if (!tempResponse.ok) {
      throw new Error("Failed to fetch temperature data");
    }

    const weatherData = await weatherResponse.json();
    const tempData = await tempResponse.json();

    const forecasts = weatherData.items[0].forecasts;
    const validPeriod = weatherData.items[0].valid_period; // Extracting valid period
    const areaMetadata = weatherData.area_metadata; // Assuming this is part of the weatherData

    // Loop through area metadata to find the closest area
    areaMetadata.forEach((area) => {
      const { latitude, longitude } = area.label_location;
      const distance = haversineDistance(lat, lon, latitude, longitude);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestArea = area.name;
      }
    });

    // Find the forecast for the closest area
    forecasts.forEach((forecast) => {
      if (forecast.area === closestArea) {
        forecastForClosest = forecast.forecast;
      }
    });

    // Loop through temperature stations to find the closest temperature station
    tempData.data.stations.forEach((station) => {
      const { latitude, longitude } = station.location;
      const distance = haversineDistance(lat, lon, latitude, longitude);

      if (distance < closestTempDistance) {
        closestTempDistance = distance;
        closestTempStation = station.name; // Store the closest station name
        closestTempDeviceId = station.deviceId; // Store the deviceId for comparison
      }
    });

    // Find the temperature for the closest station
    tempData.data.readings[0].data.forEach((reading) => {
      if (reading.stationId === closestTempDeviceId) {
        console.log(reading.stationId);
        temperatureForClosest = reading.value; // Get the temperature value
      }
    });

    console.log(temperatureForClosest);
    console.log(forecastForClosest);
    // Extract and format cut-off timing
    // Convert the valid period's start and end times to the local time zone (Singapore, UTC+8)
    const startDate = new Date(validPeriod.start);
    const endDate = new Date(validPeriod.end);

    // Adjust by adding 8 hours to account for UTC+12 (Singapore time zone)
    startDate.setHours(startDate.getHours());
    endDate.setHours(endDate.getHours());

    // Format the times in 24-hour format
    const startTime = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return {
      weather: forecastForClosest,
      cutOffTiming: `${startTime}-${endTime}`, // Formatting cut-off timing
      temperature: temperatureForClosest, // Returning temperature for the closest station
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Return some default data in case of an error
    return {
      weather: "Unknown",
      cutOffTiming: "N/A",
      temperature: 0,
    };
  }
}

async function fetchLocationFromAPI(lat, lon) {
  const weatherResponse = await fetch(
    "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
  );

  // Check if the response is okay (status in the range 200-299)
  if (!weatherResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }

  // Parse the JSON response
  const forecastResponse = await weatherResponse.json();

  let nearestLocation = null; // To store the nearest location
  let nearestDistance = Infinity; // Start with a very large distance

  // Function to calculate the distance between two lat/lon points using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  // Loop through area_metadata to find the nearest area
  forecastResponse.area_metadata.forEach((area) => {
    const areaLat = area.label_location.latitude;
    const areaLon = area.label_location.longitude;

    // Calculate the distance from the input coordinates to this area
    const distance = calculateDistance(lat, lon, areaLat, areaLon);

    // Update nearest location if this area is closer
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestLocation = area.name; // Update nearest location name
    }
  });

  return { location: nearestLocation };
}

async function fetchActivitiesFromAPI(lat, lon) {
  // Mock data for nearby activities
  return {
    activities: [
      {
        name: "TEST",
        description: "Lorem ipsum dolor",
        distance: "0.5 KM",
        geocode: [1.3521, 103.8198],
      },
      {
        name: "Indoor Yoga",
        description: "Lorem ipsum dolor",
        distance: "1.3 KM",
        geocode: [1.3531, 103.8199],
      },
      {
        name: "Boxing Gym",
        description: "Lorem ipsum dolor",
        distance: "2.0 KM",
        geocode: [1.3541, 103.82],
      },
      {
        name: "Swimming Pool",
        description: "Lorem ipsum dolor",
        distance: "2.3 KM",
        geocode: [1.3551, 103.8201],
      },
      // Add more activities as needed
    ],
  };
}

export default Landing;
