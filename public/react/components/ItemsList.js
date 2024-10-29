import React from 'react';
import { Item } from './Item';

export const ItemsList = ({ items, onItemClick }) => {
    return (
        <>
            {items.map((item, idx) => (
                <div key={idx} onClick={() => onItemClick(item)}>
                    <Item item={item} />
                </div>
            ))}
        </>
    );
};

