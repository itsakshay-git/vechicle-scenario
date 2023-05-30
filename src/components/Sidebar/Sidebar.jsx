import React, { useEffect, useState }from 'react';


const Sidebar = () => {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    // Fetch scenarios from the json-server API and update the state
    fetch('https://vechicle-scenario-api.onrender.com/scenarios')
      .then((response) => response.json())
      .then((data) => setScenarios(data));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar">
      <h2>Scenarios</h2>
      <ul>
        {scenarios.map((scenario) => (
          <li key={scenario.id}>{scenario.name}</li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Sidebar;