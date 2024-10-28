import React, { useState, useEffect } from 'react';
//import { SaucesList } from './SaucesList';
import { ItemsList } from './ItemsList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [items, setItems] = useState([]);

	async function fetchItems() {
		try {
			const response = await fetch(`http://localhost:3000/api/items`);
			const itemsData = await response.json();
			setItems(Array.isArray(itemsData) ? itemsData : []); // Ensure itemsData is an array
			console.log(itemsData)
		} catch (err) {
			console.log("Oh no an error! ", err);
			setItems([]); // Set items to an empty array on error
		}
	}
	

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<main>	
      <h1>Car Store hi</h1>
			<h2>All things 🔥</h2>
			<h1>test</h1>
			<ItemsList items={items} />
		</main>
	)
}