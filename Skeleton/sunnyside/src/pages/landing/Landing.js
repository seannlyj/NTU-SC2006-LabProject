import "../../styling/Landing.css";
import ProfileButton from "./ProfileButton.js";
import TemperatureDisplayPanel from "./TemperatureDisplayPanel.js";
import SettingsPanel from "./SettingsPanel.js";
import EditProfilePanel from "./EditProfilePanel.js";
import MapComponent from "./MapComponent";
import HintPanel from "./HintPanel.js";
import React, { useState, useEffect } from "react";

const Landing = () => {
  // Settings Panel
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toggle the side panel open or close
  const toggleSettingsPanel = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Edit Profile Panel
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Toggle the side panel open or close
  const toggleEditProfilePanel = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
  };

  // User related variables
  const [preferences, setPreferences] = useState([
    "Running",
    "Swimming",
    "Hiking",
  ]);

  // Weather related variables
  const [weather, setWeather] = useState("Fair(Day)");
  const [weatherName, setWeatherName] = useState("Fair(Day)");
  const [weatherCutoffTime, setWeatherCutoffTime] = useState("11:30 to 13:30");
  const [temperature, setTemperature] = useState("0");
  const [location, setLocation] = useState("ANG MO KIO");

  // Activity related variables
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Fetch data from APIs
  useEffect(() => {
    fetchWeatherData();
    fetchLocationData();
    fetchNearbyActivities();
  }, []);

  const fetchWeatherData = async () => {
    const weatherData = await fetchWeatherFromAPI();
    setWeather(weatherData.weather);
    setTemperature(`${weatherData.temperature}`);
    setWeatherCutoffTime(weatherData.cutOffTiming);
    setWeatherName(getWeatherName(weatherData.weather));
  };

  const getWeatherName = (weather) => {
    switch (weather) {
      case "Fair(Day)":
      case "Fair":
      case "Fair(Night)":
        return "FAIR";
      case "Warm":
        return "WARM";
      case "Partly Cloudy":
      case "Cloudy":
      case "Partly Cloudy(Day)":
      case "Partly Cloudy(Night)":
        return "CLOUDY";
      case "Hazy":
      case "Slightly Hazy":
        return "HAZY";
      case "Mist":
        return "MISTY";
      case "Fog":
        return "FOGGY";
      case "Windy":
        return "WINDY";
      case "Passing Showers":
      case "Light Showers":
      case "Showers":
      case "Heavy Showers":
        return "SHOWERS";
      case "Light Rain":
      case "Moderate Rain":
      case "Heavy Rain":
        return "RAINY";
      case "Thundery Showers":
      case "Heavy Thundery Showers":
      case "Heavy Thunder Showers with Gusty Wind":
        return "THUNDERSTORM";
      default:
        return "ERROR";
    }
  };

  const fetchLocationData = async () => {
    const locationData = await fetchLocationFromAPI();
    setLocation(locationData.location);
  };

  const fetchNearbyActivities = async () => {
    const activitiesData = await fetchActivitiesFromAPI();
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
          <MapComponent selectedActivity={selectedActivity} />
        </div>
        <TemperatureDisplayPanel
          weather={weather}
          weatherName={weatherName}
          weatherCutoffTime={weatherCutoffTime}
          temperature={temperature}
          location={location}
          activities={activities}
          onActivityClick={handleActivityClick}
        />
        <SettingsPanel
          isOpen={isSettingsOpen}
          toggleSettingsPanel={toggleSettingsPanel}
          toggleEditProfilePanel={toggleEditProfilePanel}
          preferences={preferences}
          setPreferences={setPreferences} // Add setPreferences to update preferences
        />
        <EditProfilePanel
          isOpen={isEditProfileOpen}
          toggleEditProfilePanel={toggleEditProfilePanel}
          preferences={preferences}
          setPreferences={setPreferences} // Ensure changes are reflected
        />
      </div>
    </div>
  );
};

// Mock API functions
async function fetchWeatherFromAPI() {
  return {
    weather: "Partly Cloudy",
    temperature: 25,
    cutOffTiming: "11:30 to 13:30",
  };
}

async function fetchLocationFromAPI() {
  return { location: "ANG MO KIO" };
}

async function fetchActivitiesFromAPI() {
  return {
    activities: [
      {
        name: "Gym",
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
    ],
  };
}

export default Landing;
