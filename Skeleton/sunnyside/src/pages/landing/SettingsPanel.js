import logo from "../../art/sunnysidelogo.PNG";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import "../../styling/SettingsPanel.css";

function SettingsPanel({
  isOpen,
  toggleSettingsPanel,
  toggleEditProfilePanel,
  preferences,
}) {
  // State to hold activities
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  // Mock function to simulate fetching activities from a database
  const fetchActivities = () => {
    const mockActivities = [
      { activity: "Running", date: "2023-10-01", time: "07:00 AM" },
      { activity: "Swimming", date: "2023-10-02", time: "08:00 AM" },
      { activity: "Hiking", date: "2023-10-03", time: "09:00 AM" },
      { activity: "Swimming", date: "2023-10-02", time: "08:00 AM" },
      { activity: "Hiking", date: "2023-10-03", time: "09:00 AM" },
    ];
    setActivities(mockActivities);
  };

  // Fetch activities when the component mounts
  useEffect(() => {
    fetchActivities();
  }, []);

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

        <div className="BottomPanel">
          <h4>Recent Activities</h4>

          <table className="ActivityTable">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.activity}</td>
                  <td>{activity.date}</td>
                  <td>{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="LogoutButton" onClick={() => {
            alert("Logged out");
            navigate("/login");
            }}
            >
            <span className="material-icons">logout</span>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
