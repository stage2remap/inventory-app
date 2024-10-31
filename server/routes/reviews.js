const express = require('express');
const router = express.Router();
const { Review } = require('../models');
const { body, validationResult } = require('express-validator');


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
router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
        body('comment').notEmpty().withMessage('Comment is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, rating, comment } = req.body;
        try {
            const newReview = await Review.create({ name, rating, comment });
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ error: 'Error creating review' });
        }
    }
);

module.exports = router;
