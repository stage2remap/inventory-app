import React from 'react';
import './Style/Basket.css';

export const Basket = ({ basket, removeFromBasket, setBasket }) => {
    const totalPrice = basket.reduce((total, item) => total + item.price, 0);

    const handlePurchase = () => {
        alert(`Purchase successful! Total amount: £${totalPrice.toFixed(2)}`);
        setBasket([])
    };
    return  (
        <div className="basket-container">
            <h2>Your Basket</h2>
            {basket.length === 0 ? (
                <p>Your basket is empty</p>
            ) : (
                <>
                    {basket.map((item) => (
                        <div key={item.id} className="basket-item">
                            <div className="basket-item-content">
                                <img src={item.image} alt={`${item.make} ${item.model}`} className="basket-item-image" />
                                <div className="basket-item-details">
                                    <h4>{item.make} - {item.model}</h4>
                                    <p><strong>Price:</strong> £{item.price}</p>
                                    <button onClick={() => removeFromBasket(item.id)} className="remove-button">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="basket-summary">
                        <h3>Total Price: £{basket.reduce((total, item) => total + item.price, 0).toFixed(2)}</h3>
                        <button onClick={() =>handlePurchase()} className="purchase-button">Purchase</button>
                    </div>
                </>
            )}
        </div>
    );
    
    
    
};
