const express = require("express");
const router = express.Router();

// different model routers
router.use('/sauces', require('./sauces'));
router.use('/items', require('./items'));
router.use('/reviews', require('./reviews'));

module.exports = router;
