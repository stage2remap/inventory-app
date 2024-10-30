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
import {SelectedItem} from './SelectedItem'

export const App = () => {
    const [items, setItems] = useState([]);
    const [reviews, setReviews] = useState([]); // State for reviews
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortCriterion, setSortCriterion] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [editCar, setEditCar] = useState(false)


    // Fetch items
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
    async function fetchItem(itemId) {
        try {
            console.log(itemId)

            const response = await fetch(`http://localhost:3000/api/items/${itemId}`);
            console.log("Fetch item id = ", itemId)
            const updatedItem = await response.json();
            console.log("updatedItem: ", updatedItem)
            setSelectedItem(updatedItem); 
        } catch (err) {
            alert("Error fetching item", err);
            setSelectedItem(null); 
        }
    }
    
    // Add a car
    async function addCar(car) {
        try{
            await fetch(`http://localhost:3000/api/items`, {
            method: 'POST',
            body: JSON.stringify(car),
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(response.ok){
            fetchItems();
            alert("Car added successfully!")
        }else{
            alert("Error in adding car")
        }}
        catch(error) {
            console.log("Error updating car:", error);
        }
    }

    // Delete a car
    async function deleteCar(car) {
        await fetch(`http://localhost:3000/api/items/${car.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        handleBackClick();
        fetchItems();
    }

    async function updateCar(id, updatedData){
       try {
        const response = await fetch(`http://localhost:3000/api/items/${id}` ,{ 
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: {
                'Content-type':'application/json'
            }

        });
        if (response.ok) {

            fetchItem(id)
    }   else {
            alert("Failed to update car");
    }}catch (error) {
        console.log("Error updating car:", error);
    }
}

    // Fetch reviews
    async function fetchReviews() {
        try {
            const response = await fetch(`http://localhost:3000/api/reviews`);
            const reviewsData = await response.json();
            setReviews(Array.isArray(reviewsData) ? reviewsData : []);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setReviews([]);
        }
    }

    // Add a new review
    async function addReview(newReview) {
        try {
            const response = await fetch(`http://localhost:3000/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview),
            });
            const addedReview = await response.json();
            setReviews([...reviews, addedReview]);
        } catch (error) {
            console.error("Error adding review:", error);
        }
    }

    useEffect(() => {
        fetchItems();
        fetchReviews(); // Fetch reviews on component mount
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleBackClick = () => {
        setSelectedItem(null)
        fetchItems();
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
                deleteCar={deleteCar}
                reviews={reviews}         
                addReview={addReview} 
                updateCar = {updateCar}
                editCar = {editCar}
                setEditCar = {setEditCar} 
                useEffect = {useEffect}    
                fetchItem = {fetchItem}
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
    deleteCar,
    reviews,
    addReview,
    updateCar,
    editCar,
    setEditCar,
    fetchItem
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
                        <SelectedItem selectedItem = {selectedItem} handleBackClick={handleBackClick} deleteCar ={deleteCar} updateCar ={updateCar} editCar = {editCar} setEditCar={setEditCar} fetchItem={fetchItem} />
                    ) : (
                        <ItemsList items={sortedItems()} onItemClick={handleItemClick} />
                    )
                } />
                <Route path="/search" element={
                    <Search 
                        items={items}
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                        handleItemClick={handleItemClick}
                        selectedItem={selectedItem}
                        handleBackClick={handleBackClick}
                    />
                } />
                <Route path="/manage" element={<ManageCars addCar={addCar} />} />
                <Route path="/about" element={<About />} />
                <Route path="/reviews" element={<Reviews reviews={reviews} addReview={addReview} />} />
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
