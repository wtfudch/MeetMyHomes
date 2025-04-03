const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingController');

// Define routes
router.get('/', listingsController.getListingsPage); // Change '/listings' to '/'

module.exports = router;