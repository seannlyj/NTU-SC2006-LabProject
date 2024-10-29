import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../art/sunnysidelogo.PNG";
import "../styling/Login.css";
const bcrpyt = require('bcryptjs');

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setFadeOut(true);
    setTimeout(() => navigate("/signup"), 500); // Wait for the animation to complete
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(`Entered email: ${email}`);
    console.log(`Entered password: ${password}`);

    try {
      // Send login request to the backend
      const data = { email: email };
      console.log(`Finding user`);
      const user_json = await axios.get("/api/users/".concat(email));
      const user = user_json.data[0];
      console.log(`Found user: `, user.email);

      // Compare passwords
      const passwordMatch = await bcrpyt.compare(password, user.password);

      console.log(`Checking password`);
      if (passwordMatch) {
        navigate("/landing", { state: { email: email } });
        //setFadeOut(true);
        //setTimeout(() => navigate("/landing"), 1000); // Wait for the animation to complete
      } else {
        setErrorMessage("Wrong Password");
      }

      // navigate("/landing");
    } catch (error) {
      // Handle login failure
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(message); // Set the error message state
    }
  };

  return (
    <div className="Login">
      <div className="Logo">
        <img src={logo} alt="Logo" />
        <h1>SunnySide</h1>
        <h2>brighten your day,</h2>
        <h2>no matter the weather</h2>
      </div>

      <div className={`LoginForm ${fadeOut ? "fade-out" : ""}`}>
        <h1>Welcome Back</h1>
        {errorMessage && <div className="error">{errorMessage}</div>}{" "}
        {/* Display error message if exists */}
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Call handleSubmit on form submission */}
          <div className="emailInputField">
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
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>
          <div>
            <button type="submit">Log In</button>
          </div>
          <div className="signup-container">
            <span className="signup-subtext">Don't have an account? </span>
            <a href="/signup" className="sign-up" onClick={handleSignUpClick}>
              Sign up{" "}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
