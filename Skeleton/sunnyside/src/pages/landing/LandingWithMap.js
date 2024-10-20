import React, { useState } from 'react';
import TemperatureDisplayPanel from './TemperatureDisplayPanel';
import MapComponent from './MapComponent';

const LandingWithMap = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Function to handle activity click in the TemperatureDisplayPanel
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity); // Set the selected activity (includes geocode)
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Pass the handler to TemperatureDisplayPanel */}
      <TemperatureDisplayPanel onActivityClick={handleActivityClick} />

      {/* Pass the selected activity to MapComponent */}
      <MapComponent selectedActivity={selectedActivity} />
    </div>
  );
};

export default LandingWithMap;
