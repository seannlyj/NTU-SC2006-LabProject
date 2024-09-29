import logo from "../../art/sunnysidelogo.PNG";
import React from "react";
import "../../styling/SettingsPanel.css";

function SettingsPanel({
  isOpen,
  toggleSettingsPanel,
  toggleEditProfilePanel,
}) {
  // Example preferences, replace with actual data as needed
  const preferences = ["Running", "Swimming", "Hiking"];

  return (
    <div>
      <div className={`Settings ${isOpen ? "open" : ""}`}>
        <div className="TopPanel">
          <div className="TopPanelHeader">
            <div className="TitleContainer">
              <h4>Settings</h4>
            </div>
            <div className="ButtonContainer">
              <span
                className="material-icons EditOutlined"
                onClick={toggleEditProfilePanel}
              >
                edit
              </span>
              <span
                className="material-icons Close"
                onClick={toggleSettingsPanel}
              >
                close
              </span>
            </div>
          </div>

          <div className="ProfileIconCircle">
            <span className="material-icons ProfileIcon">person</span>
          </div>

          <h4 className="UserName">John Doe</h4>
          <label className="UserEmail">lorem_ipsum@gmail.com</label>

          <div className="UserPreferences">
            {preferences.map((preference, index) => (
              <div key={index} className="PreferenceTag">
                {preference}
              </div>
            ))}
          </div>
        </div>

        <div className="BottomPanel">TEST</div>
      </div>
    </div>
  );
}

export default SettingsPanel;
