import React from "react";
import "../../styling/HintPanel.css";

function HintPanel({ weather }) {
  const getHint = (weather) => {
    switch (weather) {
      case "Fair (Day)":
      case "Fair":
      case "Fair (Night)":
        return "It's a fair day! Great for outdoor activities.";
      case "Warm":
        return "It's warm outside. Stay hydrated!";
      case "Partly Cloudy":
      case "Cloudy":
      case "Partly Cloudy (Day)":
      case "Partly Cloudy (Night)":
        return "It's cloudy. You might want to carry an umbrella.";
      case "Hazy":
      case "Slightly Hazy":
        return "It's hazy. Consider wearing a mask.";
      case "Mist":
        return "It's misty. Drive carefully.";
      case "Fog":
        return "It's foggy. Visibility is low.";
      case "Windy":
        return "It's windy. Secure loose items.";
      case "Passing Showers":
      case "Light Showers":
      case "Showers":
      case "Heavy Showers":
        return "It's raining. Don't forget your umbrella.";
      case "Light Rain":
      case "Moderate Rain":
      case "Heavy Rain":
        return "It's raining heavily. Stay indoors if possible.";
      case "Thundery Showers":
      case "Heavy Thundery Showers":
      case "Heavy Thunder Showers with Gusty Wind":
        return "Thunderstorms expected. Stay safe indoors.";
      default:
        return "Weather data unavailable.";
    }
  };

  return (
    <div className="HintPanelContainer">
      <p>{getHint(weather)}</p>
    </div>
  );
}

export default HintPanel;
