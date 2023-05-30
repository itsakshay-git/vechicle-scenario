import React, { useEffect, useState } from "react";
import "./VehicleForm.css";
import axios from "axios";
import { Link } from "react-router-dom";

const VehicleForm = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [initialPositionX, setInitialPositionX] = useState("");
  const [initialPositionY, setInitialPositionY] = useState("");
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch scenarios from the json-server API and update the state
    axios
      .get("http://localhost:5000/scenarios")
      .then((response) => {
        setScenarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scenarios:", error);
      });

  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "vehicleName") {
      setVehicleName(value);
    } else if (name === "initialPositionX") {
      setInitialPositionX(value);
    } else if (name === "initialPositionY") {
      setInitialPositionY(value);
    } else if (name === "speed") {
      setSpeed(value);
    } else if (name === "direction") {
      setDirection(value);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const newVehicle = {
      id: Date.now(), 
      name: vehicleName,
      initialPositionX: Number(initialPositionX),
      initialPositionY: Number(initialPositionY),
      speed: Number(speed),
      direction,
    };

    fetch("http://localhost:5000/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVehicle),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New vehicle added:", data);
        setVehicleName("");
        setInitialPositionX("");
        setInitialPositionY("");
        setSpeed("");
        setDirection("");
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
      });
  };

  const resethandler = () => {
    setVehicleName("");
    setInitialPositionX("");
    setInitialPositionY("");
    setSpeed("");
    setDirection("");
  }

  const handleScenarioChange = (event) => {
    const scenarioId = parseInt(event.target.value);
    const scenario = scenarios.find((scenario) => scenario.id === scenarioId);
    setSelectedScenario(scenario);

    axios
      .get(`http://localhost:5000/vehicles?scenarioId=${scenarioId}`)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  };



  return (
    <div className="vehicle-form">
      <h2>Create Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="vehicle-inputcontainer">
          <div className="flex-vehicle">
            <div className="inputs">
              <label>Scenarios</label>
              <select
                className="vehicletext"
                value={selectedScenario?.id || ""}
                onChange={handleScenarioChange}
              >
                <option value="">Select a scenario</option>
                {scenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputs">
              <label>Vehicle Name:</label>
              <input
                className="vehicletext"
                type="text"
                name="vehicleName"
                value={vehicleName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="inputs">
              <label>Initial Position X:</label>
              <input
                className="vehicletext"
                type="number"
                name="initialPositionX"
                value={initialPositionX}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex-vehicle">
            <div className="inputs">
              <label>Initial Position Y:</label>
              <input
                className="vehicletext"
                type="number"
                name="initialPositionY"
                value={initialPositionY}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="inputs">
              <label>Speed:</label>
              <input
                className="vehicletext"
                type="number"
                name="speed"
                value={speed}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="inputs">
              <label>Direction:</label>
              <select
                className="vehicletext"
                name="direction"
                value={direction}
                onChange={handleInputChange}
                required
              >
                <option value="">Select direction</option>
                <option value="Towards">Towards</option>
                <option value="Backwards">Backwards</option>
                <option value="Upwards">Upwards</option>
                <option value="Downwards">Downwards</option>
              </select>
            </div>
          </div>
        </div>
        <div className="btn-group">
          <button className="add" type="submit">Create</button>
          <button className="reset" onClick={resethandler}>Reset</button>
          <button className="back"><Link to="/">Go Back</Link></button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;

// import React, { useState } from 'react';

// const VehicleForm = ({ handleAddVehicle }) => {
//   const [vehicleName, setVehicleName] = useState('');
//   const [positionX, setPositionX] = useState('');
//   const [positionY, setPositionY] = useState('');
//   const [speed, setSpeed] = useState('');
//   const [direction, setDirection] = useState('');

//   const resetForm = () => {
//     setVehicleName('');
//     setPositionX('');
//     setPositionY('');
//     setSpeed('');
//     setDirection('');
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const newVehicle = {
//       vehicleId: Date.now(),
//       name: vehicleName,
//       initialPositionX: parseInt(positionX, 10),
//       initialPositionY: parseInt(positionY, 10),
//       speed: parseInt(speed, 10),
//       direction,
//     };

//     handleAddVehicle(newVehicle);
//     resetForm();
//   };

//   return (
//     <div className="vehicle-form">
//       <h2>Create Vehicle</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Vehicle Name:
//           <input
//             type="text"
//             name="vehicleName"
//             value={vehicleName}
//             onChange={(event) => setVehicleName(event.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Initial Position X:
//           <input
//             type="number"
//             name="positionX"
//             value={positionX}
//             onChange={(event) => setPositionX(event.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Initial Position Y:
//           <input
//             type="number"
//             name="positionY"
//             value={positionY}
//             onChange={(event) => setPositionY(event.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Speed:
//           <input
//             type="number"
//             name="speed"
//             value={speed}
//             onChange={(event) => setSpeed(event.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Direction:
//           <select
//             name="direction"
//             value={direction}
//             onChange={(event) => setDirection(event.target.value)}
//             required
//           >
//             <option value="">Select direction</option>
//             <option value="Towards">Towards</option>
//             <option value="Backwards">Backwards</option>
//             <option value="Upwards">Upwards</option>
//             <option value="Downwards">Downwards</option>
//           </select>
//         </label>
//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// };

// export default VehicleForm;
