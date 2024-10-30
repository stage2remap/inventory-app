import React from 'react';
import { Item } from './Item';
import './Style/ItemsList.css';

export const ItemsList = ({ items, onItemClick }) => {
  return (
    <div className="items-container">
      {items.map((item, idx) => (
        <div key={idx} className="item-card" onClick={() => onItemClick(item)}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};