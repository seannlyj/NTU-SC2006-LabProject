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
  const [inputWeather, setInputWeather] = useState(weather); // Default value is the passed weather prop
  const [currentWeather, setCurrentWeather] = useState(weather);
  const [inputTemp, setTemp] = useState(temperature);
  const [currentTemp, setTemperature] = useState(temperature);
  const [isDemoMode, setIsDemoMode] = useState(false); // State to track demo mode

  useEffect(() => {
    fetchDayTimeData();
  }, []);

  const fetchDayTimeData = async () => {
    const dayTimeData = await fetchDayTimeFromAPI();
    setDayTime(dayTimeData.dayTime);
  };

  const handleWeatherUpdate = () => {
    // Update the current weather when the button is clicked
    if (isDemoMode) {
      setCurrentWeather(inputWeather); // Set the selected weather from the dropdown
      // You can set a fixed temperature for demo mode or retrieve it from weather conditions
      const demoWeatherData = getWeatherData(inputWeather);
      setTemperature(demoWeatherData.temperature);
    } else {
      // In live mode, you can decide whether to fetch the live data again if needed
      // Here we're simply using the passed weather and temperature
      setCurrentWeather(weather);
      setTemperature(temperature);
    }
  };

  const weatherIcon = getWeatherIcon(currentWeather); // Use currentWeather to get the icon

  return (
    <div className={`SidePanel`}>
      <img src={weatherIcon} alt={currentWeather} className="WeatherIcon" />
      <label className="Temperature">{currentTemp}&deg;C</label> {/* Use currentTemp */}
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
            onClick={() => onActivityClick(activity)} // Handle click
          >
            <div className="ActivityDetails">
              <h4>{activity.popUp}</h4>
              <p>{activity.description}</p>
            </div>
            <label className="ActivityDistance">{activity.distance}</label>
          </div>
        ))}
      </div>

      <h3>For Demo Purpose</h3>
      <div className="WeatherUpdate">
        <label>
          <input
            type="checkbox"
            checked={isDemoMode}
            onChange={(e) => setIsDemoMode(e.target.checked)} // Update demo mode state
          />
          Demo Mode
        </label>
        <select
          value={inputWeather}
          onChange={(e) => setInputWeather(e.target.value)} // Update state on dropdown change
          className="WeatherDropdown"
          disabled={!isDemoMode} // Disable dropdown if not in demo mode
        >
          <option value="Cloudy">Cloudy</option>
          <option value="Partly Cloudy(Day)">Partly Cloudy (Day)</option>
          <option value="Partly Cloudy(Night)">Partly Cloudy (Night)</option>
          <option value="Fair(Day)">Fair (Day)</option>
          <option value="Fair(Night)">Fair (Night)</option>
          <option value="Fog">Fog</option>
          <option value="Showers">Showers</option>
          <option value="Thundery Showers">Thundery Showers</option>
          <option value="Windy">Windy</option>
        </select>
        <button onClick={handleWeatherUpdate} className="WeatherUpdateButton">
          Update Weather
        </button>
      </div>
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

  return weatherConditions[weather] || { temperature: 20 }; // Default temperature if not found
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
    ); // Example API endpoint
    const data = await response.json();

    // Extracting the current datetime and formatting it
    const currentDateTime = new Date(data.datetime);
    const day = currentDateTime
      .toLocaleDateString("en-GB", { weekday: "long" })
      .toUpperCase(); // E.g., "FRIDAY"
    const time = currentDateTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }); // E.g., "12:00"

    return { dayTime: `${day}, ${time}` };
  } catch (error) {
    console.error("Error fetching daytime:", error);
    return { dayTime: "Error fetching time" }; // Return a fallback if there's an error
  }
}

export default TemperatureDisplayPanel;
