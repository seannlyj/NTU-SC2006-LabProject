import logo from '../art/sunnysidelogo.PNG';
import '../styling/Login.css';

function Login() {
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

        <form>
            <div className="emailInputField">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" required />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <div className="forgot-password">
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
            </div>

            <div>
                <button type="submit">Log In</button>
            </div>
            <div className="signup-container">
              <span className="signup-subtext">Don't have an account? </span>
              <a href="/signup" className="sign-up">Sign up</a>
            </div>
        </form>

      </div>
    </div>

  );
}

export default Login;