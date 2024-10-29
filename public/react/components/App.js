import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemsList';
import apiURL from '../api';

export const App = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    async function fetchItems() {
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(Array.isArray(itemsData) ? itemsData : []); // Ensure itemsData is an array
        } catch (err) {
            console.log("Oh no, an error! ", err);
            setItems([]); // Set items to an empty array on error
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    // Handle item click to show details
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    // Function to go back to the list view
    const handleBackClick = () => {
        setSelectedItem(null);
    };

    return (
        <main>
            <h1>Raami Whips</h1>
            <h2>All things 🔥</h2>

            {selectedItem ? (
                // Show selected item details
                <div>
                    <h3>{selectedItem.make} - {selectedItem.model}</h3>
                    <p><strong>ID:</strong> {selectedItem.id}</p>
                    <p><strong>Color:</strong> {selectedItem.color}</p>
                    <p><strong>Year:</strong> {selectedItem.year}</p>
                    <p><strong>Mileage:</strong> {selectedItem.mileage}</p>
                    <p><strong>BHP:</strong> {selectedItem.bhp}</p>
                    <p><strong>Raaminess:</strong> {selectedItem.raaminess}/5</p>
                    <p><strong>Description:</strong> {selectedItem.description}</p>
                    <p><strong>Price:</strong> ${selectedItem.price}</p>
                    <img src={selectedItem.image} alt={`${selectedItem.make} ${selectedItem.model}`} width="300" />
                    <button onClick={handleBackClick}>Back to list</button>
                </div>
            ) : (
                // Show the list of items
                <ItemsList items={items} onItemClick={handleItemClick} />
            )}
        </main>
    );
};
