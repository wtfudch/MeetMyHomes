const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// GET /properties - Show all properties
router.get('/', propertyController.getAllProperties);

// GET /properties/:id - Show specific property
router.get('/:id', propertyController.getPropertyById);

module.exports = router;