import logo from '../art/sunnysidelogo.PNG';
import '../styling/SidePanelActivity.css';

function SidePanelActivity() {
  return (
    <div className={`SidePanel`}>
      <img src={logo} alt="WeatherIcon" className="WeatherIcon" />
        <a className='Temperature'>Placeholder</a>
        <a className='Location'>Placeholder</a>
        <a className='Day'>Placeholder</a>

        <h3>Nearby Activities</h3>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    </div>
  );
}

export default SidePanelActivity;