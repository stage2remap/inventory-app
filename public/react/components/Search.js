import React from 'react';
import { ItemsList } from './ItemsList';
import './Style/SelectedItem.css';

export const Search = ({ items, searchQuery, handleSearchChange, handleItemClick, selectedItem, handleBackClick }) => {
    
    const filteredItems = items.filter(item =>
        item.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.year.toString().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2 className="search-title">Search Cars</h2>
            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by make, model, year, or description"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            {selectedItem ? (
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
                </div>
            ) : (
                <ItemsList items={filteredItems} onItemClick={handleItemClick} />
            )}
        </div>
    );
};
