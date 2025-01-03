import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../art/sunnysidelogo.PNG";
import "../styling/Signup.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(""); //NEW - state for dynamic password error
  const [fadeOut, setFadeOut] = useState(false);

  const navigate = useNavigate();

  // Fade out animation when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      setFadeOut(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleLogInClick = (e) => {
    e.preventDefault();
    setFadeOut(true);
    setTimeout(() => navigate("/login"), 500); // Wait for the animation to complete
  };
  
  // Function to check if password meets the requirements - NEW
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase letter //added
    const hasLowerCase = /[a-z]/.test(password); // Check for lowercase letter //added
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for symbol //added
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasSymbol && isLongEnough; //added
  };

  const handlePasswordChange = (e) => {//NEW!!!
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check password validity as user types
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Your password must contain at least one uppercase letter, one lowercase letter, and one symbol      AND must be 8 characters long."
      ); //new
    } else {
      setPasswordError(""); // Clear error message if valid //new
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log(`Entered name: ${firstName} ${lastName}`);
    console.log(`Entered email: ${email}`);
    console.log(`Entered password: ${[password]}`);
    console.log(`Entered confirm password: ${confirmPassword}`);

    
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    // Check if the password meets the requirements //added - NEW
    if (!validatePassword(password)) {
      setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, and one symbol one symbol AND must be 8 characters long."); //added
      return; //added
    }
    try {
      // Send signup request to the backend
      const data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      };
      const response = await axios.post("/api/users/", data);

      // If signup is successful, set success message
      setErrorMessage(""); // Clear error message if signup is successful
      alert("User Successfully Created");
      navigate("/login");
    } catch (error) {
      // Handle signup failure
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
      setErrorMessage(message); // Set the error message state
    }
  };

  return (
    <div className="Signup">
      <div className="Logo">
        <img src={logo} alt="Logo" />
        <h1>SunnySide</h1>
        <h2>brighten your day,</h2>
        <h2>no matter the weather</h2>
      </div>
      <div className={`SignupForm ${fadeOut ? "fade-out" : ""}`}>
        <h1>Create Account</h1>
        
        {errorMessage && <div className="error">{errorMessage}</div>} 
        {passwordError && <div className="error">{passwordError}</div>} {/* Display password error message if exists // ADDED */}
        {/* Display error message if exists */}
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Call handleSubmit on form submission */}
          <div className="name-container">
            <div className="firstname-container">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="lastname-container">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="whole-password-container">
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange} //new change - handle input change for dynamic error
                required
              />
            </div>
            <div className="confirm-password-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <p>You are agreeing to the Terms of Service and Privacy Policy.</p>
          </div>
          <div>
            <button type="submit">Sign up</button>
          </div>
          <div className="login-container">
            <span className="login-subtext">Already have an account? </span>
            <a href="/login" className="log-in" onClick={handleLogInClick}>
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
