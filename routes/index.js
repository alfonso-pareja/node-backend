const { Router } = require('express');

const { track }     = require('../controllers/tracks');
const { favorites } = require('../controllers/favorites');

const router = Router();


router.get('/track', track);




module.exports = router;
