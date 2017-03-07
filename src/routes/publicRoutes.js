var express = require('express');
var router = express.Router();
var publicControllers = require('../controllers/publicControllers');
//Public Pages

//GET

router.get('/', publicControllers.homepage);

router.get('/login', publicControllers.loginForm);

router.get('/search', publicControllers.search);

router.get('/searchAPI', publicControllers.searchAPI);

router.get('/movieInfo/:movieId', publicControllers.movieInfo);

router.get('/profile', publicControllers.profile);

//POST

// router.post('/login', )

router.post('/signUp', publicControllers.signUp);

module.exports = router;