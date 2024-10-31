import React, { useState } from 'react';
import './Style/SelectedItem.css';

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
        setEditCar(false); 
        setNewValue(""); 
        fetchItem(selectedItem.id);
    };
    const renderFireRating = (rating) => {
        return Array.from({ length: rating }, (_, i) => (
            <span key={i} >&#128293;</span>
        ));
    };


    return (
        <div className="selected-item-container">
            <h3>{selectedItem.make} - {selectedItem.model}</h3>
            <p><strong>ID:</strong> {selectedItem.id}</p>
            <p><strong>Year:</strong> {selectedItem.year}</p>
            <p><strong>Mileage:</strong> {selectedItem.mileage}</p>
            <p><strong>BHP:</strong> {selectedItem.bhp}</p>
            <p><strong>Raaminess:</strong> {renderFireRating(selectedItem.raaminess)}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Price:</strong> £{selectedItem.price}</p>
            <p><strong>Color:</strong> {selectedItem.color}</p>
            <p><strong>Date Added:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
            <img src={selectedItem.image} alt={`${selectedItem.make} ${selectedItem.model}`} width = "560px"/>
            <button onClick={handleBackClick} className="back-button">Back to list</button>
            <button onClick={() => deleteCar(selectedItem)} className="delete-button">Delete Car</button>
            <button onClick={() => setEditCar(true)} className="edit-button">Edit Car</button>

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
