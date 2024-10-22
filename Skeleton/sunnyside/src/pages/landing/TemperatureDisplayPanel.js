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

  //use a useEffect to fetch info from individual APIs
  useEffect(() => {
    //Mock function for daytime
    fetchDayTimeData();
  }, []);

  const fetchDayTimeData = async () => {
    //Mock function api call (to replace later on)
    const dayTimeData = await fetchDayTimeFromAPI();
    setDayTime(dayTimeData.dayTime);
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

async function fetchDayTimeFromAPI() {
  try {
    const response = await fetch(
      "http://worldtimeapi.org/api/timezone/Europe/London"
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
