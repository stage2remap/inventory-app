const express = require('express');
const router = express.Router();
const { Review } = require('../models');

//GET All Reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
});



//POST New Review
router.post('/', async (req, res) => {
    const { name, rating, comment } = req.body;
    try {
        const newReview = await Review.create({ name, rating, comment });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Error creating review' });
    }
});

module.exports = router;
