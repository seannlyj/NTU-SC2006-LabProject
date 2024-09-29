import React, { useState } from "react";
import "../../styling/Landing.css";
import ProfileButton from "./ProfileButton.js";
import TemperatureDisplayPanel from "./TemperatureDisplayPanel.js";
import SettingsPanel from "./SettingsPanel.js";
import EditProfilePanel from "./EditProfilePanel.js";
import MapComponent from "./MapComponent"; // Import the MapComponent

function Landing() {
  //Settings Panel
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState([
    "Running",
    "Swimming",
    "Hiking",
  ]);

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

export default Landing;
