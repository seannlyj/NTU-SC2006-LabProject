import React, { useState } from "react";
import "../../styling/Landing.css";
import ProfileButton from "./ProfileButton.js";
import TemperatureDisplayPanel from "./TemperatureDisplayPanel.js";
import SettingsPanel from "./SettingsPanel.js";
import MapComponent from "./MapComponent"; // Import the MapComponent

function Landing() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toggle the side panel open or close
  const toggleSettingsPanel = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="Landing">
      <div className="header">
        <ProfileButton toggleSettingsPanel={toggleSettingsPanel} />
      </div>
      <div className="content-container">
        <div className="map-wrapper">
          <MapComponent />
        </div>
        <TemperatureDisplayPanel />
        <SettingsPanel
          isOpen={isSettingsOpen}
          toggleSettingsPanel={toggleSettingsPanel}
        />
      </div>
    </div>
  );
}

export default Landing;
