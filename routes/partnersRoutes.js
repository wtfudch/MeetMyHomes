const express = require('express');
const router  = express.Router();
const { getPartnersPage } = require('../controllers/partnersController');

router.get('/', getPartnersPage);

module.exports = router;
