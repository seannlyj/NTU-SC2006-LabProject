import logo from "../../art/sunnysidelogo.PNG";
import React from "react";
import "../../styling/SettingsPanel.css";

function SettingsPanel({ isOpen, toggleSettingsPanel }) {
  return (
    <div>
      <div className={`Settings ${isOpen ? "open" : ""}`}>
        <a className="CloseButton" onClick={toggleSettingsPanel}>
          &times;
        </a>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsPanel;
