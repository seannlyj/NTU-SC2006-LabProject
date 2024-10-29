import logo from "../../art/sunnysidelogo.PNG";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styling/SettingsPanel.css";
import CustomModal from "./CustomModal";

function SettingsPanel({
  isOpen,
  toggleSettingsPanel, // Function to close the SettingsPanel
  toggleEditProfilePanel,
  preferences,
  setPreferences, // New prop to allow preference updates
  email,
}) {
  // State to hold user's name and email
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const email = "mysterystudent007@gmail.com"; // Hardcoded email

  // State to hold activities
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  // State to hold user's preferences
  const [userPreferences, setUserPreferences] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to fetch user's details from the database
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/users/${email}`);
      const user = response.data[0]; // Access the first user in the array
      console.log(user);
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setActivities(user.activitylog);

      // Update user preferences
      setUserPreferences(
        [user.preference1, user.preference2, user.preference3].filter(
          (preference) => preference
        )
      ); // Filter out any undefined preferences
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
/*
  // Function to fetch activities from the database
  const fetchActivities = () => {
    // You can also fetch activities here if needed
  };

  */

  // Fetch user details when the component mounts or when `isOpen` changes
  useEffect(() => {
    if (isOpen) {
      fetchUserDetails();
      // fetchActivities(); // This could be left as is if you plan to fetch activities later
    }
  }, [isOpen]); // Refetch data when the panel opens

  

  // Modified function to open EditProfilePanel and close SettingsPanel
  const handleEditProfile = () => {
    toggleEditProfilePanel(); // Open EditProfilePanel
    toggleSettingsPanel(); // Close SettingsPanel
  };

  // New function to handle clicks on user preferences
  const handlePreferenceClick = (preference) => {
    // Here you could pass the preference to the EditProfilePanel if needed
    console.log("Clicked preference:", preference); // Log the clicked preference
    handleEditProfile(); // Call the edit profile handler
  };

  const handleLogout = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login"); // Navigate to login after closing the modal
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
                onClick={handleEditProfile} // Use modified handler
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
            {/* Map through user preferences and make each clickable */}
            {userPreferences.map((preference, index) => (
              <div
                key={index}
                className="PreferenceTag"
                onClick={() => handlePreferenceClick(preference)} // Clickable preference
              >
                {/* Display "+" if preference is 'None' */}
                {preference === 'None' ? '+' : preference} 
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
              {activities
              .slice(-5) // display latest 5 activity
              .reverse() // display latest loggedactivity at the top
              .map((activity, index) => (
                <tr key={index}>
                  <td>{activity.activityName}</td>
                  <td>{activity.date}</td>
                  <td>{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="LogoutButton" onClick={handleLogout}>
            <span className="material-icons">logout</span>
            Log out
          </button>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        message="You've been logged out. See you again!"
        onClose={closeModal}
      />
    </div>
  );
}

export default SettingsPanel;
