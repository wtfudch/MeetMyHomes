const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// GET /about - Show about page
router.get('/', aboutController.getAboutPage);

module.exports = router;