const { Router }    = require('express');
const { cacheInit } = require('../middleware/cache')

const { searchTrack }     = require('../controllers/tracks');
const { getFavorites,setFavorites }      = require('../controllers/favorites');

const router = Router();


router.get('/search_tracks', cacheInit, searchTrack);
router.get('/favorites', getFavorites)
router.post('/favorites', setFavorites)




module.exports = router;
