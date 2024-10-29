import React from 'react';

export const Item = (props) => {

  return <>
    <h3><span>{props.item.make}</span> <span>{props.item.model}</span>
    </h3>
  </>
} 

