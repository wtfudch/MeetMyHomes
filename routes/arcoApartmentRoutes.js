const express = require('express');
const router = express.Router();
const arcoApartmentController = require('../controllers/arcoApartmentController');

// Define routes
router.get('/arcoApartment', arcoApartmentController.getArcoApartmentPage);

module.exports = router;