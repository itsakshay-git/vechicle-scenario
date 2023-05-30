import React, { useState } from 'react';
import Modal from 'react-modal';

const AddVehicleModal = ({ isOpen, closeModal, addVehicle }) => {
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('Towards');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new vehicle object
    const newVehicle = {
      id: vehicleId,
      name: vehicleName,
      initialPositionX: parseInt(initialPositionX),
      initialPositionY: parseInt(initialPositionY),
      speed: parseInt(speed),
      direction: direction,
    };

    // Add the new vehicle using the addVehicle function passed from the parent component
    addVehicle(newVehicle);

    // Reset the form fields
    setVehicleId('');
    setVehicleName('');
    setInitialPositionX('');
    setInitialPositionY('');
    setSpeed('');
    setDirection('Towards');

    // Close the modal
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        {/* Vehicle form fields */}
        <label>
          Vehicle ID:
          <input
            type="text"
            value={vehicleId}
            onChange={(event) => setVehicleId(event.target.value)}
            required
          />
        </label>
        <label>
          Vehicle Name:
          <input
            type="text"
            value={vehicleName}
            onChange={(event) => setVehicleName(event.target.value)}
            required
          />
        </label>
        <label>
          Initial Position X:
          <input
            type="number"
            value={initialPositionX}
            onChange={(event) => setInitialPositionX(event.target.value)}
            required
          />
        </label>
        <label>
          Initial Position Y:
          <input
            type="number"
            value={initialPositionY}
            onChange={(event) => setInitialPositionY(event.target.value)}
            required
          />
        </label>
        <label>
          Speed:
          <input
            type="number"
            value={speed}
            onChange={(event) => setSpeed(event.target.value)}
            required
          />
        </label>
        <label>
          Direction:
          <select value={direction} onChange={(event) => setDirection(event.target.value)}>
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
        </label>
        <button type="submit">Add Vehicle</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddVehicleModal;
