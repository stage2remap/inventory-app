import React from 'react';

export const Item = (props) => {
    return (
        <div>
            <h3>{props.item.make} {props.item.model}</h3>
        </div>
    );
};
