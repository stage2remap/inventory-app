// Reviews.js
import React, { useState } from 'react';
import './Reviews.css';

export const Reviews = ({ reviews, addReview }) => {
    const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addReview(newReview);
        setNewReview({ name: '', rating: 0, comment: '' });
    };

    const renderStars = (rating) => {
        return Array(5).fill().map((_, i) => (
            <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
        ));
    };

    return (
        <div className="review-page-container">
            <div className="review-content">
                <div className="review-form-container">
                    <h2>Add a Review</h2>
                    <form onSubmit={handleSubmit} className="review-form">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            required
                        />
                        <div className="star-rating">
                            {Array(5).fill().map((_, i) => (
                                <span
                                    key={i}
                                    className={i < newReview.rating ? 'star filled' : 'star'}
                                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            placeholder="Your Comments"
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            required
                        />
                        <button type="submit" className="submit-button">Submit Review</button>
                    </form>
                </div>

                <div className="review-list-container">
                    <h2>Customer Reviews</h2>
                    <div className="reviews-list">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <strong>{review.name}</strong>: {renderStars(review.rating)}
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
