import "../../styling/Landing.css";
import ProfileButton from "./ProfileButton.js";
import TemperatureDisplayPanel from "./TemperatureDisplayPanel.js";
import SettingsPanel from "./SettingsPanel.js";
import EditProfilePanel from "./EditProfilePanel.js";
import MapComponent from "./MapComponent"; // Import the MapComponent
import HintPanel from "./HintPanel.js";
import React, { useState, useEffect } from "react";

function Landing() {
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
    "Running",
    "Swimming",
    "Hiking",
  ]);

  //Weather related variables
  const [weather, setWeather] = useState("Fair(Day)"); // Set variable for weather icon and set it's default to cloud
  const [weatherName, setWeatherName] = useState("Fair(Day)");
  const [weatherCutoffTime, setWeatherCutoffTime] = useState("11:30 to 13:30");
  const [temperature, setTemperature] = useState("0");
  const [location, setLocation] = useState("ANG MO KIO");

  //Activity related variables
  const [activities, setActivities] = useState([]);

  //use a useEffect to fetch info from individual APIs
  useEffect(() => {
    //These functions will call a function to fetch data from APIs
    //Currently, the fetchers for API data are mock functions
    fetchWeatherData();
    fetchLocationData();
    fetchNearbyActivities();
  }, []);

  const fetchWeatherData = async () => {
    //Mock function api call (to replace later on)
    const weatherData = await fetchWeatherFromAPI();
    setWeather(weatherData.weather);
    setTemperature(`${weatherData.temperature}`);
    setWeatherCutoffTime(weatherData.cutOffTiming);

    //Setting weather name based on weather provided by NEA API
    switch (weatherData.weather) {
      case "Fair(Day)":
      case "Fair":
      case "Fair(Night)":
        setWeatherName("FAIR");
        break;
      case "Warm":
        setWeatherName("WARM");
        break;
      case "Partly Cloudy":
      case "Cloudy":
      case "Partly Cloudy(Day)":
      case "Partly Cloudy(Night)":
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

  const fetchLocationData = async () => {
    //Mock function api call (to replace later on)
    const locationData = await fetchLocationFromAPI();
    setLocation(locationData.location);
  };

  const fetchNearbyActivities = async () => {
    //Mock function api call (to replace later on)
    const activitiesData = await fetchActivitiesFromAPI();
    setActivities(activitiesData.activities);
  };

  return (
    <div className="Landing">
      <div className="header">
        <ProfileButton toggleSettingsPanel={toggleSettingsPanel} />
        <HintPanel weather={weather} />
      </div>
      <div className="content-container">
        <div className="map-wrapper">
          <MapComponent />
        </div>
        <TemperatureDisplayPanel
          weather={weather}
          weatherName={weatherName}
          weatherCutoffTime={weatherCutoffTime}
          temperature={temperature}
          location={location}
          activities={activities}
        />
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
          setPreferences={setPreferences}
        />
      </div>
    </div>
  );
}

// Mock API functions
//Modify variables here to test different weather conditions
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
  // Mock data for nearby activities
  return {
    activities: [
      {
        name: "Gym",
        description: "Lorem ipsum dolor",
        distance: "0.5 KM",
      },
      {
        name: "Indoor Yoga",
        description: "Lorem ipsum dolor",
        distance: "1.3 KM",
      },
      {
        name: "Boxing Gym",
        description: "Lorem ipsum dolor",
        distance: "2.0 KM",
      },
      {
        name: "Swimming Pool",
        description: "Lorem ipsum dolor",
        distance: "2.3 KM",
      },
      // Add more activities as needed
    ],
  };
}

export default Landing;
