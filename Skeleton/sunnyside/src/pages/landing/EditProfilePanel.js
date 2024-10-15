import logo from "../../art/sunnysidelogo.PNG";
import React, { useState, useEffect } from "react";
import ChangePW from "./ChangePW";
import "../../styling/EditProfilePanel.css";
import axios from "axios"; // Import axios for making API requests

function EditProfilePanel({
  isOpen,
  toggleEditProfilePanel,
  preferences,
  setPreferences,
  userEmail, // new prop passed from Landing.js
}) {
  const allActivities = [
    "Running",
    "Swimming",
    "Hiking",
    "Cycling",
    "Yoga",
    "Bouldering",
    "Martial Arts",
    "Soccer",
    "Basketball",
  ];

  const [selectedActivities, setSelectedActivities] = useState(preferences);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Fetch user's data from the database
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/users/${userEmail}`); // Use userEmail prop
      const user = response.data;
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setSelectedActivities(user.preferences || []);
      console.log("User data fetched successfully!");
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // Update the user's name and preferences in the database
  const updateUserData = async (updatedData) => {
    try {
      const response = await axios.patch(`/api/users/${userEmail}`, updatedData); // Use userEmail prop
      console.log("User data updated successfully!", response.data);
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  };

  // Handle form submission for updating the user's name
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData({ firstname: firstName, lastname: lastName });
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, [userEmail]); // Refetch data if userEmail changes

  // Handle activity selection (User is limited to selecting 3 activities)
  const handleActivityClick = (activity) => {
    let newSelectedActivities;
    if (selectedActivities.includes(activity)) {
      newSelectedActivities = selectedActivities.filter((a) => a !== activity);
    } else if (selectedActivities.length < 3) {
      newSelectedActivities = [...selectedActivities, activity];
    } else {
      alert("You can only select up to 3 activities.");
      return;
    }
    setSelectedActivities(newSelectedActivities);
    setPreferences(newSelectedActivities);
    updateUserData({ preferences: newSelectedActivities });
  };

  const groupedActivities = [];
  for (let i = 0; i < allActivities.length; i += 3) {
    groupedActivities.push(allActivities.slice(i, i + 3));
  }

  return (
    <div>
      <div className={`EditProfile ${isOpen ? "open" : ""}`}>
        <div className="EditProfileTopPanel">
          <div className="EditProfileTopPanelHeader">
            <div className="EditProfileTitleContainer">
              <h4>Edit Profile</h4>
            </div>
            <div className="ButtonContainer">
              <span
                className="material-icons Close"
                onClick={toggleEditProfilePanel}
              >
                close
              </span>
            </div>
          </div>

          <div className="ProfileIconCircle">
            <span className="material-icons ProfileIcon">person</span>
          </div>

          <form onSubmit={handleSubmit} className="EditProfileForm">
            <div className="InputContainer">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="InputContainer">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button type="submit" className="SaveButton">
              Save
            </button>
          </form>
        </div>

        <div className="EditProfileBottomPanel">
          <table className="ActivityTable">
            <thead>
              <tr>
                <th colSpan="3">Activity Preference</th>
              </tr>
            </thead>
            <tbody>
              {groupedActivities.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((activity, colIndex) => (
                    <td
                      key={colIndex}
                      className={
                        selectedActivities.includes(activity) ? "selected" : ""
                      }
                      onClick={() => handleActivityClick(activity)}
                    >
                      {activity}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="ChangePasswordButton"
            // onClick={() => alert("Change Password here")}
            onClick={() => setIsResetPWPanelOpen(true)}
          >
            <span className="material-icons">password</span>
            Change Password
          </button>
        </div>
      </div>
      <ChangePW
        isOpen={isResetPWPanelOpen}
        onClose={() => setIsResetPWPanelOpen(false)}
      />
    </div>
  );
}

export default EditProfilePanel;
