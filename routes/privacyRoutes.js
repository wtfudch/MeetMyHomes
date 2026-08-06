const express = require('express');
const router  = express.Router();
const { getPrivacy } = require('../controllers/privacyController');

router.get('/', getPrivacy);

module.exports = router;
