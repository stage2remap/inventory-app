import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ItemsList } from './ItemsList';
import { LandingPage } from './LandingPage';
import { Search } from './Search';
import { ManageCars } from './ManageCars';
import { About } from './About';
import { Reviews } from './Reviews';
import apiURL from '../api';

export const App = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    async function fetchItems() {
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(Array.isArray(itemsData) ? itemsData : []);
        } catch (err) {
            console.log("Oh no, an error! ", err);
            setItems([]);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleBackClick = () => {
        setSelectedItem(null);
    };

    return (
        <Router>
            <nav>
                <Link to="/items">Inventory</Link>
                <Link to="/search">Search</Link>
                <Link to="/manage">Manage Cars</Link>
                <Link to="/about">About Us</Link>
                <Link to="/reviews">Reviews</Link>
            </nav>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/items" element={
                    selectedItem ? (
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
                        <ItemsList items={items} onItemClick={handleItemClick} />
                    )
                } />
                <Route path="/search" element={<Search />} />
                <Route path="/manage" element={<ManageCars />} />
                <Route path="/about" element={<About />} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </Router>
    );
};
