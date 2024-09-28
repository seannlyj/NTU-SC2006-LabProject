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

import React, { useState } from "react";

function TemperatureDisplayPanel() {
  const [weather, setWeather] = useState("cloudy_day"); // Set variable for weather icon and set it's default to cloud

  //use a useEffect to fetch weather data from API here
  //...

  const weatherIcon = getWeatherIcon(weather);

  return (
    <div className={`SidePanel`}>
      <img src={weatherIcon} alt={weather} className="WeatherIcon" />
      {/* <a className='Temperature'>Placeholder</a>
      <a className='Location'>Placeholder</a>
      <a className='Day'>Placeholder</a>

      <h3>Nearby Activities</h3>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a> */}
    </div>
  );
}

function getWeatherIcon(weather) {
  switch (weather) {
    case "cloud":
      return cloud;
    case "cloudy_day":
      return cloudy_day;
    case "cloudy_night":
      return cloudy_night;
    case "fair_day":
      return fair_day;
    case "fair_night":
      return fair_night;
    case "fog":
      return fog;
    case "showers":
      return showers;
    case "thundery_showers":
      return thundery_showers;
    case "windy":
      return windy;
    default:
      return cloud;
  }
}

export default TemperatureDisplayPanel;
