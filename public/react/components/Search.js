// Search.js
import React from 'react';
import { ItemsList } from './ItemsList';

export const Search = ({ items, searchQuery, handleSearchChange, handleItemClick, selectedItem, handleBackClick }) => {
    // Filter items based on search query
    const filteredItems = items.filter(item =>
        item.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.year.toString().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Search Cars</h2>
            <input
                type="text"
                placeholder="Search by make, model, year, or description"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {selectedItem ? (
                <div>
                    <h3>{selectedItem.make} - {selectedItem.model}</h3>
                    <p><strong>ID:</strong> {selectedItem.id}</p>
                    <p><strong>Year:</strong> {selectedItem.year}</p>
                    <p><strong>Mileage:</strong> {selectedItem.mileage}</p>
                    <p><strong>BHP:</strong> {selectedItem.bhp}</p>
                    <p><strong>Raaminess:</strong> {selectedItem.raaminess}/5</p>
                    <p><strong>Description:</strong> {selectedItem.description}</p>
                    <p><strong>Price:</strong> ${selectedItem.price}</p>
                    <img src={selectedItem.image} alt={`${selectedItem.make} ${selectedItem.model}`} width="300" />
                    <button onClick={handleBackClick}>Back to search results</button>
                </div>
            ) : (
                <ItemsList items={filteredItems} onItemClick={handleItemClick} />
            )}
        </div>
    );
};
