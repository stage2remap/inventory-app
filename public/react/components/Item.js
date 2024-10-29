// Item.js
import React from 'react';
import './Item.css';

export const Item = ({ item }) => {
  return (
    <div className="car-card">
      <img className="car-image" src={item.image} alt={`${item.make} ${item.model}`} />
      <div className="car-info">
        <h3>{item.make} {item.model}</h3>
        <p className="car-price">${item.price}</p>
        <div className="car-details">
          <p><strong>Year:</strong> {item.year}</p>
          <p><strong>Mileage:</strong> {item.mileage} miles</p>
          <p><strong>BHP:</strong> {item.bhp}</p>
          <p><strong>Raaminess:</strong> {item.raaminess}/5</p>
        </div>
      </div>
    </div>
  );
};
