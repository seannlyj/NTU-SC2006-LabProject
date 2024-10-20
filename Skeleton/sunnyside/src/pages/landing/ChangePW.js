import React, { useState } from "react";
import "../../styling/ChangePW.css"; 
import erorrLogo from '../../art/ChangePW-icons/errorCross.png';
import successfulLogo from '../../art/ChangePW-icons/successfulTick.png';


function ChangePW({ isOpen, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [pwChangeSuccessful, setPwChangeSuccessful] = useState(false);
  const handleClose = () => {   //reset the states once password is changed so it doesnt get stuck on successful
    onClose();
    setNewPassword("");
    setConfirmPassword("");
    setPwChangeSuccessful(false);
    setPasswordMismatch(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        setPasswordMismatch(true);
     
      return;
    }
    
    setPwChangeSuccessful(true);
    setPasswordMismatch(false);
    console.log("Password changed successfully!");
   
  };

  if (!isOpen) return null; 

  return (
    <div className="resetPasswordPanel">
      <div className="resetPasswordContent">
        <button className="closeButton" onClick={handleClose}>
          &times;
        </button>

        {pwChangeSuccessful ? (
          <div className="successMessage">
            <img src={successfulLogo} alt="Password change successful" />
            <h3>Password changed</h3>
            <p>Your password has been changed successfully.</p>
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
            Change password
          </button>
        </form>
        </>
        )}
      </div>
    </div>
  );
}

export default ChangePW;
