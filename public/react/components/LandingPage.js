import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/items'); // Redirect to the items list page
    };

    return (
        <main>
            <h1>Welcome to Raami Whips</h1>
            <p>Your one-stop shop for all things 🔥 in the car world!</p>
            <button onClick={handleEnterClick}>Enter the Site</button>
        </main>
    );
};
