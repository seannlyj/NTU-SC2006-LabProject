import "../../styling/TemperatureDisplayPanel.css";
import cloud from "../../art/weather-icons/cloud.png";
import cloudy_day from "../../art/weather-icons/cloudy-day.png";
import cloudy_night from "../../art/weather-icons/cloudy-night.png";
import fair_day from "../../art/weather-icons/fair-day.png";
import fair_night from "../../art/weather-icons/fair-night.png";
import fog from "../../art/weather-icons/fog.png";
import showers from "../../art/weather-icons/showers.png";
import thundery_showers from "../../art/weather-icons/thundery-showers.png";
import windy from "../../art/weather-icons/windy.png";

import React, { useState, useEffect } from "react";

function TemperatureDisplayPanel({ onActivityClick }) {
  const [weather, setWeather] = useState("Fair(Day)"); // Set variable for weather icon and set it's default to cloud
  const [weatherName, setWeatherName] = useState("Fair(Day)");
  const [weatherCutoffTime, setWeatherCutoffTime] = useState("11:30 to 13:30");

  const [temperature, setTemperature] = useState("0");
  const [location, setLocation] = useState("ANG MO KIO");
  const [dayTime, setDayTime] = useState("FRIDAY, 00:00");
  const [activities, setActivities] = useState([]);

  //use a useEffect to fetch info from individual APIs
  useEffect(() => {
    //These functions will call a function to fetch data from APIs
    //Currently, the fetchers for API data are mock functions
    fetchWeatherData();
    fetchLocationData();
    fetchDayTimeData();
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

  const fetchDayTimeData = async () => {
    //Mock function api call (to replace later on)
    const dayTimeData = await fetchDayTimeFromAPI();
    setDayTime(dayTimeData.dayTime);
  };

  const fetchNearbyActivities = async () => {
    //Mock function api call (to replace later on)
    const activitiesData = await fetchActivitiesFromAPI();
    setActivities(activitiesData.activities);
  };

  const weatherIcon = getWeatherIcon(weather);

  return (
    <div className={`SidePanel`}>
      <img src={weatherIcon} alt={weather} className="WeatherIcon" />
      <label className="Temperature">{temperature}&deg;C</label>
      <label className="Location">{location} </label>
      <label className="Day">{dayTime}</label>
      <div className="WeatherInfoFromAPI">
        <label className="WeatherName">{weatherName}</label>
        <label className="WeatherCutoffTime">{weatherCutoffTime}</label>
      </div>

      <h3>NEARBY ACTIVITIES</h3>
      <div className="ActivitiesContainer">
        {activities.map((activity, index) => (
          <div className="Activity" key={index} onClick={() => onActivityClick(activity)}>
            <div className="ActivityDetails">
              <h4>{activity.name}</h4>
              <p>{activity.description}</p>
            </div>
            <label className="ActivityDistance">{activity.distance}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

function getWeatherIcon(weather) {
  if (weather === "Partly Cloudy" || weather === "Cloudy") {
    return cloud;
  } else if (weather === "Partly Cloudy(Day)") {
    return cloudy_day;
  } else if (weather === "Partly Cloudy(Night)") {
    return cloudy_night;
  } else if (
    weather === "Fair(Day)" ||
    weather === "Fair" ||
    weather === "Warm"
  ) {
    return fair_day;
  } else if (weather === "Fair(Night)") {
    return fair_night;
  } else if (
    weather === "Hazy" ||
    weather === "Slightly Hazy" ||
    weather === "Mist" ||
    weather === "Fog"
  ) {
    return fog;
  } else if (
    weather === "Passing Showers" ||
    weather === "Light Showers" ||
    weather === "Showers" ||
    weather === "Heavy Showers" ||
    weather === "Light Rain" ||
    weather === "Moderate Rain" ||
    weather === "Heavy Rain"
  ) {
    return showers;
  } else if (
    weather === "Thundery Showers" ||
    weather === "Heavy Thundery Showers" ||
    weather === "Heavy Thunder Showers with Gusty Wind"
  ) {
    return thundery_showers;
  } else if (weather === "Windy") {
    return windy;
  } else {
    return cloud;
  }
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

async function fetchDayTimeFromAPI() {
  return { dayTime: "FRIDAY, 12:00" };
}

async function fetchActivitiesFromAPI() {
  // Mock data for nearby activities
  return {
    activities: [
      {
        name: "Gym",
        description: "Lorem ipsum dolor",
        distance: "0.5 KM",
        geocode: [1.3521, 103.8198], // Example coordinates
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
        geocode: [1.3541, 103.8200],
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

export default TemperatureDisplayPanel;
