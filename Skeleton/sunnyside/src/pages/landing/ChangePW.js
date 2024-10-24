import React, { useState } from "react";
import "../../styling/ChangePW.css"; 
import errorLogo from '../../art/ChangePW-icons/errorCross.png';
import successfulLogo from '../../art/ChangePW-icons/successfulTick.png';
import axios from "axios";

function ChangePW({ isOpen, onClose, userEmail}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [pwChangeSuccessful, setPwChangeSuccessful] = useState(null); // neutral state so idh to create new state

  const handleClose = () => {   
    //reset the states once password is changed so it doesnt get stuck on successful
    onClose();
    setNewPassword("");
    setConfirmPassword("");
    setPwChangeSuccessful(null);
    setPasswordMismatch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        console.log("Passwords do not match"); 
        setPasswordMismatch(true);
     
      return;
    }

    setPasswordMismatch(false);

    try {
      // Simulate failure 
      //throw new Error("Simulated failure");  

      const response = await axios.patch(`/api/users/${userEmail}`, {  
        password: newPassword,
      });

      if (response.status === 200) {
        setPwChangeSuccessful(true); // Set success state <-- Modified: Set pwChangeSuccessful to true
        console.log("Password changed successfully!");
      }
    } catch (error) {
      // If there is an error from the backend, show the error message
      setPwChangeSuccessful(false); // Set to false to indicate failure 
      console.error("Failed to change password:", error.response?.data?.message || error.message);
    }
  };
    

    /*
    old parts
    setPwChangeSuccessful(true);
    setPasswordMismatch(false);
    console.log("Password changed successfully!");
  }; 
  */

  if (!isOpen) return null; 

  return (
    <div className="resetPasswordPanel">
      <div className="resetPasswordContent">
        <button className="closeButton" onClick={handleClose}>
          &times;
        </button>

        {pwChangeSuccessful == true ? (
          <div className="successMessage">
            <img src={successfulLogo} alt="Password change successful" />
            <h3>Password changed</h3>
            <p>Your password has been changed successfully.</p>
          </div>
           ) : pwChangeSuccessful == false ? (  
            <div className="passwordChangeError">
              <img src={errorLogo} alt="Password change failed" />
              <h3>Password change failed</h3>
              <p>An error has occurred while processing the password reset. Please try again.</p>
            </div>
        ) : (
          <>

        <h2>Reset your password</h2>
        <p>Enter your new password</p>

        {passwordMismatch && (
            <div className="mismatchError">
            <p className="mismatchMessage">Password doesn't match</p>
        </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="textBox">
            <label htmlFor="newPassword">New password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="textBox">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="changePasswordButton">
            Change Password
          </button>
        </form>
        </>
        )}
      </div>
    </div>
  );
}

export default ChangePW;
