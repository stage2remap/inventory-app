import React, { useState } from 'react';
import './SelectedItem.css';

export const SelectedItem = ({ selectedItem, handleBackClick, deleteCar, updateCar, editCar, setEditCar, fetchItem }) => {
    const [selectedParameter, setSelectedParameter] = useState("color");
    const [newValue, setNewValue] = useState("");

    const parameters = [
        { label: "Color", value: "color" },
        { label: "Year", value: "year" },
        { label: "Mileage", value: "mileage" },
        { label: "Make", value: "make" },
        { label: "Model", value: "model" },
        { label: "BHP", value: "bhp" },
        { label: "Raaminess", value: "raaminess" },
        { label: "Description", value: "description" },
        { label: "Price", value: "price" }
    ];

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await updateCar(selectedItem.id, { [selectedParameter]: newValue });
        setEditCar(false); // Close the edit form after submitting
        setNewValue(""); // Clear the input
        fetchItem(selectedItem.id); // Re-fetch the updated item to display new data
    };

    return (
        <div className="selected-item-container">
            <h3>{selectedItem.make} - {selectedItem.model}</h3>
            <p><strong>ID:</strong> {selectedItem.id}</p>
            <p><strong>Year:</strong> {selectedItem.year}</p>
            <p><strong>Mileage:</strong> {selectedItem.mileage}</p>
            <p><strong>BHP:</strong> {selectedItem.bhp}</p>
            <p><strong>Raaminess:</strong> {selectedItem.raaminess}/5</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Price:</strong> £{selectedItem.price}</p>
            <p><strong>Color:</strong> {selectedItem.color}</p>
            <p><strong>Date Added:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</p>



            <img src={selectedItem.image} alt={`${selectedItem.make} ${selectedItem.model}`} />

            <button onClick={handleBackClick}>Back to list</button>
            <button onClick={() => deleteCar(selectedItem)}>Delete Car</button>
            <button onClick={() => setEditCar(true)}>Edit Car</button>

            {editCar && (
                <form onSubmit={handleEditSubmit} className="edit-form">
                    <label htmlFor="parameter">Edit Parameter:</label>
                    <select
                        id="parameter"
                        value={selectedParameter}
                        onChange={(e) => setSelectedParameter(e.target.value)}
                    >
                        {parameters.map((param) => (
                            <option key={param.value} value={param.value}>{param.label}</option>
                        ))}
                    </select>

                    <label htmlFor="newValue">New Value:</label>
                    <input
                        id="newValue"
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder={`Enter new ${selectedParameter}`}
                    />

                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setEditCar(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};
