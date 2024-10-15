import logo from "../../art/sunnysidelogo.PNG";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import "../../styling/SettingsPanel.css";

function SettingsPanel({
  isOpen,
  toggleSettingsPanel,
  toggleEditProfilePanel,
  userEmail,  // Assuming user's email is passed as a prop
}) {
  // State to hold user information
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    preferences: [],
  });

  const [activities, setActivities] = useState([]);

  // Function to fetch user data from the database
  const fetchUserData = async () => {
    try {
      console.log(userData);
      const response = await axios.get(`/api/users/${userEmail}`);
      setUserData({
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        preferences: response.data.activities || [], // Fetched activity preferences
      });
      console.log("User data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to fetch recent activities from the database
  const fetchActivities = async () => {
    try {
      const response = await axios.get(`/api/activities/${userEmail}`);
      setActivities(response.data);
      console.log("Activities fetched:", response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  // Fetch user data and activities when the component mounts
  useEffect(() => {
    fetchUserData();
    fetchActivities();
  }, [userEmail]);

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

          {/* Display user's full name */}
          <h4 className="UserName">{`${userData.firstname} ${userData.lastname}`}</h4>
          {/* Display user's email */}
          <label className="UserEmail">{userEmail}</label>

          {/* Display user's activity preferences */}
          <div className="UserPreferences">
            {userData.preferences.map((preference, index) => (
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

          <button className="LogoutButton" onClick={() => alert("Logged out")}>
            <span className="material-icons">logout</span>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
