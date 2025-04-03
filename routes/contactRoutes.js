const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Define routes
router.get('/', contactController.getContactPage); // Change '/contact' to '/'
router.post('/', contactController.submitContactForm); 

module.exports = router;