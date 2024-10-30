import React, { useState } from 'react';
import './Style/ManageCars.css';

export const ManageCars = ({ addCar }) => {
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [mileage, setMileage] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [bhp, setBhp] = useState("");
    const [raaminess, setRaaminess] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCar = {
            color,
            year: parseInt(year),
            mileage: parseInt(mileage),
            make,
            model,
            bhp: parseInt(bhp),
            raaminess: parseInt(raaminess),
            description,
            image,
            price: parseFloat(price)
        };

        await addCar(newCar);

        setColor("");
        setYear("");
        setMileage("");
        setMake("");
        setModel("");
        setBhp("");
        setRaaminess("");
        setDescription("");
        setImage("");
        setPrice("");
    };

    return (
        <div className="manage-cars-wrapper">
            <div className="manage-cars-container">
                <h2>Manage Cars</h2>
                <p>Admins can add, update, or delete cars from the inventory.</p>
                <h3>Add Car</h3>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <input type="text" pattern="[A-Za-z]+" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} required />
                        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
                        <input type="number" placeholder="Mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
                        <input type="text" placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} required />
                        <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
                        <input type="number" placeholder="BHP" value={bhp} onChange={(e) => setBhp(e.target.value)} required />
                        <input type="number" placeholder="Raaminess (1-5)" value={raaminess} onChange={(e) => setRaaminess(e.target.value)} required />
                        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <textarea className="description-input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="url" className="image-input" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                    <button type="submit" className="submit-button">Add Car</button>
                </form>
            </div>
        </div>
    );
};
