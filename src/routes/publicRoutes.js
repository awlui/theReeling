var express = require('express');
var router = express.Router();
var publicControllers = require('../controllers/publicControllers');
//Public Pages

//GET

router.get('/', publicControllers.homepage);


router.get('/search', publicControllers.search);

router.get('/searchAPI', publicControllers.searchAPI);

router.get('/movieInfo/:movieId', publicControllers.movieInfo);

router.get('/profile/:userId', publicControllers.profile);

//POST

module.exports = router;

