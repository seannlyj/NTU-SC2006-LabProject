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

import React, { useState, useEffect, useRef } from "react";
import CustomModal from "./CustomModal";

function TemperatureDisplayPanel({
  weather,
  weatherName,
  weatherCutoffTime,
  temperature,
  location,
  activities,
  onActivityClick,
}) {
  const [dayTime, setDayTime] = useState("FRIDAY, 00:00");
  const [inputWeather, setInputWeather] = useState(weather); // Default weather input
  const [currentWeather, setCurrentWeather] = useState(weather); // Current weather state
  const [inputTemp, setTemp] = useState(temperature); // Default temperature input
  const [currentTemp, setTemperature] = useState(temperature); // Current temperature state
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Ref to keep track of the previous weather state
  const prevWeatherRef = useRef(currentWeather);

  useEffect(() => {
    fetchDayTimeData();
    setCurrentWeather(weather);
    setTemperature(temperature);
  }, [weather, temperature]);

  useEffect(() => {
    // Check if the current weather is different from the previous weather
    if (prevWeatherRef.current !== currentWeather) {
      if (
        currentWeather === "Showers" ||
        currentWeather === "Fog" ||
        currentWeather === "Thundery Showers"
      ) {
        //alert(`⚠️ DANGER ALERT: Weather has changed to ${currentWeather}!`);      
        setModalMessage(`⚠️ DANGER ALERT: Weather has changed to ${currentWeather}!`);
        setIsModalOpen(true);
      }
    }
    // Update the ref to the current weather
    prevWeatherRef.current = currentWeather;
  }, [currentWeather]);

  const fetchDayTimeData = async () => {
    const dayTimeData = await fetchDayTimeFromAPI();
    setDayTime(dayTimeData.dayTime);
  };

  const handleWeatherUpdate = () => {
    if (isDemoMode) {
      setCurrentWeather(inputWeather);
      const demoWeatherData = getWeatherData(inputWeather);
      setTemperature(demoWeatherData.temperature);
    } else {
      setCurrentWeather(weather);
      setTemperature(temperature);
    }


  };

  const weatherIcon = getWeatherIcon(currentWeather);

  return (
    <div className={`SidePanel`}>
      <img src={weatherIcon} alt={currentWeather} className="WeatherIcon" />
      <label className="Temperature">{currentTemp}&deg;C</label>
      <label className="Location">{location} </label>
      <label className="Day">{dayTime}</label>
      <div className="WeatherInfoFromAPI">
        <label className="WeatherName">{weatherName}</label>
        <label className="WeatherCutoffTime">{weatherCutoffTime}</label>
      </div>

      <h3>NEARBY ACTIVITIES</h3>
      <div className="ActivitiesContainer">
        {activities.map((activity, index) => (
          <div
            className="Activity"
            key={index}
            onClick={() => onActivityClick(activity)}
          >
            <div className="ActivityDetails">
              <h4>{activity.popUp}</h4>
              <p>{activity.description}</p>
            </div>
            <label className="ActivityDistance">{activity.distance}</label>
          </div>
        ))}
      </div>

      <CustomModal
      isOpen={isModalOpen}
      message={modalMessage}
      onClose={() => setIsModalOpen(false)}
      backgroundColor="#e18c2e"
    />
    </div>
  );
}

// Function to get weather data for demo mode
function getWeatherData(weather) {
  const weatherConditions = {
    Cloudy: { temperature: 25 },
    "Partly Cloudy(Day)": { temperature: 28 },
    "Partly Cloudy(Night)": { temperature: 20 },
    "Fair(Day)": { temperature: 30 },
    "Fair(Night)": { temperature: 22 },
    Fog: { temperature: 18 },
    Showers: { temperature: 24 },
    "Thundery Showers": { temperature: 23 },
    Windy: { temperature: 26 },
  };

  return weatherConditions[weather] || { temperature: 20 };
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

async function fetchDayTimeFromAPI() {
  try {
    const response = await fetch(
      "http://worldtimeapi.org/api/timezone/Asia/Singapore"
    );
    const data = await response.json();

    const currentDateTime = new Date(data.datetime);
    const day = currentDateTime
      .toLocaleDateString("en-GB", { weekday: "long" })
      .toUpperCase();
    const time = currentDateTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { dayTime: `${day}, ${time}` };
  } catch (error) {
    console.error("Error fetching daytime:", error);
    return { dayTime: "Error fetching time" };
  }
}

export default TemperatureDisplayPanel;
