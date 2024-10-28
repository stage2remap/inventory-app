import React from 'react';
import { Item } from './Item';

export const ItemsList = ({ items }) => {
    return (
        <>
            {items.map((item, idx) => (
                <div key={idx} >
                    <Item item={item} />
                </div>
            ))}
        </>
    );
};