import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllScenario = () => {
    const [scenarios, setScenarios] = useState([]);
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [vehicles, setVehicles] = useState([]);

    console.log(scenarios, vehicles)

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
      }, []);

    const handleDeleteScenario = (scenarioId) => {
        // Send a DELETE request to the json-server API to delete the scenario
        axios
          .delete(`https://vechicle-scenario-api.onrender.com/scenarios/${scenarioId}`)
          .then(() => {
            // Remove the deleted scenario from the state
            setScenarios((prevScenarios) =>
              prevScenarios.filter((scenario) => scenario.id !== scenarioId)
            );
            setSelectedScenario(null);
            setVehicles([]);
          })
          .catch((error) => {
            console.error("Error deleting scenario:", error);
          });
      };

      const handleEditClick = (scenario) => {
        setSelectedScenario(scenario);
      };

    const fetchScenarios = () => {
        // Fetch scenarios from the json-server API and update the state
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
        // Send a PUT request to update the scenario details
        axios
          .put(
            `https://vechicle-scenario-api.onrender.com/scenarios/${selectedScenario.id}`,
            selectedScenario
          )
          .then((response) => {
            console.log("Scenario updated:", response.data);
            // Fetch the updated list of scenarios
            fetchScenarios();
          })
          .catch((error) => {
            console.error("Error updating scenario:", error);
          })
          .finally(() => {
            setSelectedScenario(null);
          });
      };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedScenario((prevScenario) => ({
          ...prevScenario,
          [name]: value,
        }));
      };

    const renderScenarioCell = (scenario, field) => {
        if (selectedScenario === scenario) {
          return (
            <input
              type="text"
              name={field}
              value={selectedScenario[field]}
              onChange={handleInputChange}
            />
          );
        }
        return <span>{scenario[field]}</span>;
      };


  return (
    <div className="box">
    <div className="container">
      <table className="table" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>Scenario ID</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>No. of Vehicles</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.id}>
              <td>{scenario.id}</td>
              <td>{renderScenarioCell(scenario, "name")}</td>
              <td>{renderScenarioCell(scenario, "time")}</td>
              <td>
                {
                  vehicles.filter(
                    (vehicle) => vehicle.scenarioId === scenario.id
                  ).length
                }
              </td>
              <td>
                <button>
                  <Link to="/create-vehicle">Add Vehicle</Link>
                </button>
              </td>
              <td>
                {selectedScenario === scenario ? (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setSelectedScenario(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(scenario)}>
                    Edit
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteScenario(scenario.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AllScenario;
