import React, { useState } from 'react';

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

        // Create a car object with all the fields
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

        // Call addCar with the new car object
        await addCar(newCar);

        // Clear form fields after submission
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
        <div>
            <h2>Manage Cars</h2>
            <p>Here, admins can add, update, or delete cars from the inventory.</p>
            <h3>Add Car</h3>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} required />
                <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
                <input type="number" placeholder="Mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
                <input type="text" placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} required />
                <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
                <input type="number" placeholder="BHP" value={bhp} onChange={(e) => setBhp(e.target.value)} required />
                <input type="number" placeholder="Raaminess (1-5)" value={raaminess} onChange={(e) => setRaaminess(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="url" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
};
