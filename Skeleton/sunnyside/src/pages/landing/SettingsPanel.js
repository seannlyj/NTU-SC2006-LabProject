import logo from "../../art/sunnysidelogo.PNG";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styling/SettingsPanel.css";

function SettingsPanel({
  isOpen,
  toggleSettingsPanel, // Function to close the SettingsPanel
  toggleEditProfilePanel,
  preferences,
  setPreferences, // New prop to allow preference updates
}) {
  // State to hold user's name and email
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const email = "mysterystudent007@gmail.com"; // Hardcoded email

  // State to hold activities
  const [activities, setActivities] = useState([]);

  // State to hold user's preferences
  const [userPreferences, setUserPreferences] = useState([]);

  // Function to fetch user's details from the database
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/users/${email}`);
      const user = response.data[0]; // Access the first user in the array
      setFirstName(user.firstname);
      setLastName(user.lastname);
      
      // Update user preferences
      setUserPreferences([
        user.preference1,
        user.preference2,
        user.preference3,
      ].filter(preference => preference)); // Filter out any undefined preferences
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Function to fetch activities from the database
  const fetchActivities = () => {
    // You can also fetch activities here if needed
  };

  // Fetch user details when the component mounts or when `isOpen` changes
  useEffect(() => {
    if (isOpen) {
      fetchUserDetails();
      fetchActivities(); // This could be left as is if you plan to fetch activities later
    }
  }, [isOpen]); // Refetch data when the panel opens

  // Modified function to open EditProfilePanel and close SettingsPanel
  const handleEditProfile = () => {
    toggleEditProfilePanel();  // Open EditProfilePanel
    toggleSettingsPanel();     // Close SettingsPanel
  };

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
                onClick={handleEditProfile}  // Use modified handler
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

          <h4 className="UserName">
            {firstName} {lastName}
          </h4>
          <label className="UserEmail">{email}</label>

          <div className="UserPreferences">
            {userPreferences.map((preference, index) => (
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
