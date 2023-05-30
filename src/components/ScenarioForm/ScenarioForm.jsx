import React, { useState } from "react";
import "./ScenarioForm.css";
import { Link } from "react-router-dom";

const ScenarioForm = () => {
  const [scenarioName, setScenarioName] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setScenarioName(event.target.value);
  };

  const resethandler = () => {
    setScenarioName("");
    setTime("");
    setError("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (scenarioName.trim() === "") {
      setError("Scenario name is required");
      return;
    }

    if (time === "") {
      setError("Time is required");
      return;
    }

    // Create a new scenario object
    const newScenario = {
      id: Date.now(), // Generate a unique ID (you can use a UUID library for more reliable IDs)
      name: scenarioName,
      time: parseInt(time), // Add the time field as needed
    };

    // Send a POST request to the json-server API to add the new scenario
    fetch("https://vechicle-scenario-api.onrender.com/scenarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newScenario),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New scenario added:", data);
        // Clear the scenario name input field after successful submission
        // setScenarioName("");
        // setTime("");
        // setError("");
      })
      .catch((error) => {
        console.error("Error adding scenario:", error);
      });
  };

  return (
    <div className="scenario-form">
      <h2>Create Scenario</h2>
      {/* <div className="form-container"> */}
        <form onSubmit={handleSubmit}>
          <div className="form-container"> 
          <div className="inputs">
          <label>
            Scenario Name:
          </label>
            <input
            className="inputtext"
              type="text"
              value={scenarioName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputs">
          <label>
            Time (in seconds):
          </label>
            <input
            className="inputtext"
              type="number"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
          </div>
          <div className="btn-group">
          <button className="add" type="submit">Add</button>
          <button className="reset" onClick={resethandler}>Reset</button>
          <button className="back"><Link to="/">Go Back</Link></button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    // </div>
  );
};

export default ScenarioForm;
