import logo from '../art/sunnysidelogo.PNG';
import '../styling/ProfileButton.css';

function ProfileButton() {
    return (
        <button className="ProfileButton">
            <img src={logo} alt="icon" className="ProfileIcon" />
        </button>
    );
  }
  
  export default ProfileButton;