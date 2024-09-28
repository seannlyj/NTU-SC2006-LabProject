import logo from "../../art/sunnysidelogo.PNG";
import "../../styling/ProfileButton.css";

function ProfileButton({ toggleSettingsPanel }) {
  return (
    <button className="ProfileButton" onClick={toggleSettingsPanel}>
      <span className="material-icons ProfileIcon">person</span>
    </button>
  );
}

export default ProfileButton;
