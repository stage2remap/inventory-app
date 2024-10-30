const express = require("express");
const router = express.Router();

router.use('/items', require('./items'));
router.use('/reviews', require('./reviews'));

module.exports = router;
