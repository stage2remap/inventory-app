import React from 'react';

export const Item = (props) => {

  return <>
    <h3>{props.item.make} 
      {props.item.model}
    </h3>
  </>
} 

