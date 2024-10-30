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
    const [searchQuery, setSearchQuery] = useState('');

    async function fetchItems() {
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(Array.isArray(itemsData) ? itemsData : []);
        } catch (err) {
            console.error("Oh no, an error! ", err);
            setItems([]);
        }
    }

    async function addCar(car) {
        await fetch(`http://localhost:3000/api/items`, {
            method: 'POST',
            body: JSON.stringify(car),
            headers: {
                'Content-type': 'application/json'
            }
        });
        fetchItems()
        alert("Car added successfully!")
    }

    async function deleteCar(car){
        await fetch(`http://localhost:3000/api/items/${car.id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        handleBackClick()
        fetchItems()
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Sort items function for the main inventory
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
            <MainContent
                items={items}
                selectedItem={selectedItem}
                handleItemClick={handleItemClick}
                handleBackClick={handleBackClick}
                sortedItems={sortedItems}
                addCar={addCar}
                sortCriterion={sortCriterion}
                handleSortChange={handleSortChange}
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                deleteCar = {deleteCar}
            />
        </Router>
    );
};

const MainContent = ({
    items,
    selectedItem,
    handleItemClick,
    handleBackClick,
    sortedItems,
    addCar,
    sortCriterion,
    handleSortChange,
    searchQuery,
    handleSearchChange,
    deleteCar
}) => {
    const location = useLocation();
    const shouldUseGreyBackground = ["/items", "/search", "/manage", "/reviews"].includes(location.pathname);

    return (
        <div className={shouldUseGreyBackground ? 'grey-background' : ''}>
            <nav>
                <Link to="/items">Inventory</Link>
                <Link to="/search">Search</Link>
                <Link to="/manage">Manage Cars</Link>
                <Link to="/about">About Us</Link>
                <Link to="/reviews">Reviews</Link>
            </nav>
            <SortDropdown conditionPath="/items" sortCriterion={sortCriterion} handleSortChange={handleSortChange} />

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
                            <button onClick ={()=>deleteCar(selectedItem)}> Delete Car</button>
                        </div>
                    ) : (
                        <ItemsList items={sortedItems()} onItemClick={handleItemClick} />
                    )
                } />
                <Route path="/search" element={
                <Search 
                    items={items}                                  // original prop
                    searchQuery={searchQuery}                      // original prop
                    handleSearchChange={handleSearchChange}        // original prop
                    handleItemClick={handleItemClick}              // <--- added prop
                    selectedItem={selectedItem}                    // <--- added prop
                    handleBackClick={handleBackClick}              // <--- added prop
                />} 
            />
                <Route path="/manage" element={<ManageCars addCar={addCar} />} />
                <Route path="/about" element={<About />} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </div>
    );
};

// Definition for SortDropdown component
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
