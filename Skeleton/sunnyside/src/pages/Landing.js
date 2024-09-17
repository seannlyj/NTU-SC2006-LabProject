import logo from '../art/sunnysidelogo.PNG';
import '../styling/Landing.css';
import ProfileButton from './ProfileButton.js';
import SidePanelActivity from './SidePanelActivity.js';
import Settings from './Settings.js';

function Landing() {
  return (
    
    <div className="Landing">
        <ProfileButton/>
        <SidePanelActivity/>
        <Settings/>
      
    </div>
  );
}

export default Landing;