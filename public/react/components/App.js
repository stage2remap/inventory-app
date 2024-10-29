// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ItemsList } from './ItemsList';
import { LandingPage } from './LandingPage';
import { Search } from './Search';
import { ManageCars } from './ManageCars';
import { About } from './About';
import { Reviews } from './Reviews';
import apiURL from '../api';
import './nb.css';

export const App = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortCriterion, setSortCriterion] = useState('');

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

    const handleSortChange = (e) => {
        setSortCriterion(e.target.value);
    };

    // Function to sort items based on selected criterion
    const sortedItems = () => {
        if (!sortCriterion) return items;

        return [...items].sort((a, b) => {
            if (sortCriterion === 'year') return a.year - b.year;
            if (sortCriterion === 'mileage') return a.mileage - b.mileage;
            if (sortCriterion === 'bhp') return a.bhp - b.bhp;
            if (sortCriterion === 'raaminess') return a.raaminess - b.raaminess;
            if (sortCriterion === 'price') return a.price - b.price;
            return 0;
        });
    };

    return (
        <Router>
            {/* Navbar */}
            <nav>
                <Link to="/items">Inventory</Link>
                <Link to="/search">Search</Link>
                <Link to="/manage">Manage Cars</Link>
                <Link to="/about">About Us</Link>
                <Link to="/reviews">Reviews</Link>
            </nav>

            {/* Conditionally render Sort Dropdown only on the /items route */}
            <SortDropdown conditionPath="/items" sortCriterion={sortCriterion} handleSortChange={handleSortChange} />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/items" element={
                    selectedItem ? (
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
                            <button onClick={handleBackClick}>Back to list</button>
                        </div>
                    ) : (
                        <ItemsList items={sortedItems()} onItemClick={handleItemClick} />
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

const SortDropdown = ({ conditionPath, sortCriterion, handleSortChange }) => {
    const location = useLocation();
    return location.pathname === conditionPath ? (
        <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" onChange={handleSortChange} value={sortCriterion}>
                <option value="">Select</option>
                <option value="year">Year</option>
                <option value="mileage">Mileage</option>
                <option value="bhp">BHP</option>
                <option value="raaminess">Raaminess</option>
                <option value="price">Price</option>
            </select>
        </div>
    ) : null;
};
