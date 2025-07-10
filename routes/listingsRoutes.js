const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingController');


// GET /properties - Show all properties
router.get('/', listingsController.getAllListings);

// GET /properties/:id - Show specific property
router.get('/:id', listingsController.getListingById);



module.exports = router;