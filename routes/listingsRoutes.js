const express = require('express');
const router  = express.Router();
const { getAllListings, getListingById } = require('../controllers/listingController');

router.get('/',    getAllListings);
router.get('/:id', getListingById);

module.exports = router;
