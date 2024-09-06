import logo from '../art/sunnysidelogo.PNG';
import './Signup.css';

const SignUp = () => {
  return (
    <div className="Signup">
    <div className="Logo">
      <img src={logo} alt="Logo" />
      <h1>SunnySide</h1>
      <h2>brighten your day,</h2>
      <h2>no matter the weather</h2> 
    </div>
    <div className="SignupForm">
      <h1>Create Account</h1>
      <form>
          <div className="name-container">
            <div className="firstname-container">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>
            <div className="lastname-container">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>
          </div>

          <div>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" required />
          </div>

          <div className="whole-password-container">
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="confirm-password-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required />
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
              <a href="/login" className="log-in">Log in</a>
            </div>
      </form>
    </div>
  </div>
  );
};

export default SignUp;