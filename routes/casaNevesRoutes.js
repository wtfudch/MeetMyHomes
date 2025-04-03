const express = require('express');
const router = express.Router();
const casaNevesController = require('../controllers/casaNevesController');

// Define routes
router.get('/casaNeves', casaNevesController.getCasaNevesPage);

module.exports = router;