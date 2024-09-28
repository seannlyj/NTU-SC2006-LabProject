import React, { useState } from "react";
import logo from "../../art/sunnysidelogo.PNG";
import "../../styling/Landing.css";
import ProfileButton from "./ProfileButton.js";
import TemperatureDisplayPanel from "./TemperatureDisplayPanel.js";
import SettingsPanel from "./SettingsPanel.js";

function Landing() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toggle the side panel open or close
  const toggleSettingsPanel = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="Landing">
      {/* Profile Button is a separate .js in case we want to use it on another page */}
      <ProfileButton toggleSettingsPanel={toggleSettingsPanel} />
      <TemperatureDisplayPanel />
      <SettingsPanel
        isOpen={isSettingsOpen}
        toggleSettingsPanel={toggleSettingsPanel}
      />
    </div>
  );
}

export default Landing;
