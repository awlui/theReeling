var express = require('express');
var router = express.Router();
var publicControllers = require('../controllers/publicControllers');
//Public Pages
router.get('/', publicControllers.homepage);

router.get('/login', publicControllers.login);

router.get('/search', publicControllers.search);

router.get('/movieInfo', publicControllers.movieInfo);

router.get('/profile', publicControllers.profile);

module.exports = router;