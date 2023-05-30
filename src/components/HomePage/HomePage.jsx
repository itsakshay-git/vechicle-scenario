import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [vehicledata, setvehicledata] = useState([])

  useEffect(() => {
    // Fetch scenarios from the json-server API and update the state
    axios
      .get("https://vechicle-scenario-api.onrender.com/scenarios")
      .then((response) => {
        setScenarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scenarios:", error);
      });

      axios
      .get("https://vechicle-scenario-api.onrender.com/vehicles")
      .then((response) => {
        setvehicledata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scenarios:", error);
      });

  }, []);

  const handleScenarioChange = (event) => {
    const scenarioId = parseInt(event.target.value);
    const scenario = scenarios.find((scenario) => scenario.id === scenarioId);
    setSelectedScenario(scenario);

    axios
      .get(`https://vechicle-scenario-api.onrender.com/vehicles?scenarioId=${scenarioId}`)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  };

  const handleDeleteScenario = (vechicleId) => {
    axios
      .delete(`https://vechicle-scenario-api.onrender.com/vehicles/${vechicleId}`)
      .then(() => {
        setvehicledata((prevVechicle) =>
          prevVechicle.filter((vechicle) => vechicle.id !== vechicleId)
        );
        setSelectedScenario(null);
        setVehicles([]);
      })
      .catch((error) => {
        console.error("Error deleting scenario:", error);
      });
  };

  const startSimulation = () => {
    vehicles.forEach((vehicle) => {
      const { speed, direction } = vehicle;

      let movement;

      switch (direction) {
        case "Towards":
          movement = setInterval(() => {
            vehicle.initialPositionX += speed;
            if (vehicle.initialPositionX > 750) {
              clearInterval(movement);
              vehicle.initialPositionX = -50;
            }
            setVehicles([...vehicles]);
          }, 100);
          break;
        case "Backwards":
          movement = setInterval(() => {
            vehicle.initialPositionX -= speed;
            if (vehicle.initialPositionX < -50) {
              clearInterval(movement);
              vehicle.initialPositionX = 750;
            }
            setVehicles([...vehicles]);
          }, 100);
          break;
        case "Upwards":
          movement = setInterval(() => {
            vehicle.initialPositionY -= speed;
            if (vehicle.initialPositionY < -50) {
              clearInterval(movement);
              vehicle.initialPositionY = 550;
            }
            setVehicles([...vehicles]);
          }, 100);
          break;
        case "Downwards":
          movement = setInterval(() => {
            vehicle.initialPositionY += speed;
            if (vehicle.initialPositionY > 550) {
              clearInterval(movement);
              vehicle.initialPositionY = -50;
            }
            setVehicles([...vehicles]);
          }, 100);
          break;
        default:
          break;
      }
    });
  };


  const handleEditClick = (scenario) => {
    setSelectedScenario(scenario);
  };

  const fetchScenarios = () => {
    axios
      .get("https://vechicle-scenario-api.onrender.com/scenarios")
      .then((response) => {
        setScenarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scenarios:", error);
      });
  };

  
  const handleSaveClick = () => {
    axios
      .put(
        `https://vechicle-scenario-api.onrender.com/scenarios/${selectedScenario.id}`,
        selectedScenario
      )
      .then((response) => {
        console.log("Scenario updated:", response.data);
        fetchScenarios();
      })
      .catch((error) => {
        console.error("Error updating scenario:", error);
      })
      .finally(() => {
        setSelectedScenario(null);
      });
  };


  

  return (
    <div className="home-page">
      <div className="sidebar">
        <h2>Scenarios</h2>
        <select
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
      <div className="content">
        {selectedScenario ? (
          <div className="container">
            <table className="table" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th>Vehicle ID</th>
                  <th>Vechicle Name</th>
                  <th>Position X</th>
                  <th>Position Y</th>
                  <th>Speed</th>
                  <th>Direction</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {vehicledata.map((vehicles) => (
                  <tr key={vehicles.id}>
                    <td>{vehicles.id}</td>
                    <td>{vehicles.name}</td>
                    <td>{vehicles.initialPositionX}</td>
                    <td>{vehicles.initialPositionY}</td>
                    <td>{vehicles.speed}</td>
                    <td>{vehicles.direction}</td>
                    <td>
                      {selectedScenario === vehicles ? (
                        <>
                          <button onClick={handleSaveClick}>Save</button>
                          <button onClick={() => setSelectedScenario(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => handleEditClick(vehicles)}>
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDeleteScenario(vehicles.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="action-btn">
            <button onClick={startSimulation}>Start Simulation</button>
            </div>


            <div className="vehicle-container">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="vehicle"
                  style={{
                    top: `${vehicle.initialPositionY}px`,
                    left: `${vehicle.initialPositionX}px`,
                  }}
                >
                  {vehicle.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h2>Please select a scenario</h2>
        )}
      </div>
    </div>
  );
};

export default HomePage;
