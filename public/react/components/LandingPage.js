import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/LandingPage.css';

export const LandingPage = () => {
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/items');
    };

    return (
        <main className="landing-page">
            <h1 className="landing-title">Welcome to Raami Whips</h1>
            <p className="landing-subtitle">Your one-stop shop for all things 🔥 in the car world!</p>
            <button onClick={handleEnterClick} className="enter-button">Enter the Site</button>
        </main>
    );
};