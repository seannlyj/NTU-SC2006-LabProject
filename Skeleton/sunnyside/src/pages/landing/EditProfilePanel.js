import logo from "../../art/sunnysidelogo.PNG";
import React, { useState, useEffect } from "react";
import ChangePW from "./ChangePW";
import "../../styling/EditProfilePanel.css";

function EditProfilePanel({
  isOpen,
  toggleEditProfilePanel,
  preferences,
  setPreferences,
}) {
  // Example preferences, replace with actual data as needed
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
  // State to hold selected activities
  const [selectedActivities, setSelectedActivities] = useState(preferences);

  // State to hold first name and last name
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");

  const [isResetPWPanelOpen, setIsResetPWPanelOpen] = useState(false);

  // Mock function to simulate updating the name in a database
  const updateNameInDatabase = (firstName, lastName) => {
    console.log(`Updating name in database: ${firstName} ${lastName}`);
  };

  // Mock function to simulate fetching user's name from database
  const fetchName = () => {
    const mockFirstName = "John";
    const mockLastName = "Doe";
    setFirstName(mockFirstName);
    setLastName(mockLastName);
    console.log("Name fetched successfully!");
  };

  // Mock function to simulate fetching selected activities from a database
  const fetchSelectedActivities = () => {
    // Simulate a delay
    const mockSelectedActivities = ["Running", "Swimming", "Hiking"];
    setSelectedActivities(mockSelectedActivities);
    console.log("Selected activities fetched successfully!");
  };

  // Handle form submission for first name and last name form
  const handleSubmit = (e) => {
    e.preventDefault();
    updateNameInDatabase(firstName, lastName);
  };

  // Fetch selected activities when the component mounts
  useEffect(() => {
    fetchName();
    fetchSelectedActivities();
  }, []);

  // Handle activity selection (User is limited to selected 3 activities)
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
    setPreferences(newSelectedActivities); // Update preferences in parent component
  };

  // Group activities into rows of 3
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
            <span className="material-icons ">password</span>
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
