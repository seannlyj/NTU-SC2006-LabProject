import logo from '../art/sunnysidelogo.PNG';
import React, { useState } from "react";
import '../styling/Settings.css';

function Settings() {
    const[isOpen, setIsOpen] = useState(false);

      // Toggle the side panel open or close
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
          <button onClick={toggleSidebar} className="toggle-button">
            ☰
          </button>

          <div className={`Settings ${isOpen ? 'open' : ''}`}>
            <a  className="CloseButton" onClick={toggleSidebar}>
              &times;
            </a>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
    );
}

export default Settings;