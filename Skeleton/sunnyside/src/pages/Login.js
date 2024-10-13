import React, { useState } from 'react';
import axios from 'axios';
import logo from '../art/sunnysidelogo.PNG';
import '../styling/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/users/login', { // Use the correct endpoint for login
        email,
        password,
      });

      // If login is successful, store the token and possibly redirect the user
      const { token } = response.data; // Destructure the token from response
      setToken(token); // Store the token in the state

      // Example: Store the token in localStorage (or sessionStorage)
      localStorage.setItem('authToken', token);

      // Example: Redirect to a protected route after login
      //window.location.href = "/dashboard";
      
    } catch (error) {
      // Handle login failure
      const message = error.response?.data?.message || 'Login failed. Please try again.';
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

      <div className="LoginForm">
        <h1>Welcome Back</h1>
        {errorMessage && <div className="error">{errorMessage}</div>} {/* Display error message if exists */}
        
        <form onSubmit={handleSubmit}> {/* Call handleSubmit on form submission */}
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
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </div>

          <div>
            <button type="submit">Log In</button>
          </div>

          <div className="signup-container">
            <span className="signup-subtext">Don't have an account? </span>
            <a href="/signup" className="sign-up">Sign up </a>
            <a href="/landing" className="sign-up">| Landing</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
