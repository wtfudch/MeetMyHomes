const express = require('express');
const router = express.Router();
const privacyController = require('../controllers/privacyController');

router.get('/', privacyController.getPrivacy);

module.exports = router;