// Reviews.js
import React, { useState } from 'react';
import './Reviews.css';

export const Reviews = ({ reviews, addReview }) => {
    const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addReview(newReview);
        setNewReview({ name: '', rating: '', comment: '' }); // Reset form after submission
    };

    return (
        <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <div className="reviews-list">
                {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <strong>{review.name}</strong> ({review.rating} stars): {review.comment}
                    </div>
                ))}
            </div>

            <h3>Add a Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    required
                    min="1"
                    max="5"
                />
                <textarea
                    placeholder="Your Comments"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};
