import React from 'react';

export const Item = ({ item }) => {
    return (
        <div>
            <h3>{item.make} {item.model}</h3>
            <p>Year: {item.year}</p>
            <p>Mileage: {item.mileage} miles</p>
            <p>BHP: {item.bhp}</p>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
        </div>
    );
};
