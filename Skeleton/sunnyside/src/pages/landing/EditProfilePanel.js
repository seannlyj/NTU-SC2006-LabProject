import logo from "../../art/sunnysidelogo.PNG";
import React from "react";
import "../../styling/EditProfilePanel.css";

function EditProfilePanel({ isOpen, toggleEditProfilePanel }) {
  // Example preferences, replace with actual data as needed
  const preferences = ["Running", "Swimming", "Hiking"];

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

          <h4 className="UserName">John Doe</h4>
          <label className="UserEmail">lorem_ipsum@gmail.com</label>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePanel;
