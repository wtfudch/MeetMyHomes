// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const listingController = require('../controllers/listingController');

router.get('/', (req, res) => {
  // Fetch properties (adjust based on propertyController export)
  const properties = propertyController.properties || {}; // If properties is an object
  // or propertyController.getProperties() if it's a function

  // Fetch listings
  const listings = listingController.listings;

  res.render('home', { properties, listings });
});

module.exports = router;