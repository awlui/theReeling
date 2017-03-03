var express = require('express');
var router = express.Router();
var privateControllers = require('../controllers/privateControllers')
//Private Pages

router.get('/account', privateControllers.account);

router.get('/addReview/:movieId', privateControllers.addReview);

router.get('/editReview/:reviewId', privateControllers.editReview);

router.get('/editProfile', privateControllers.editProfile);

router.get('/reviews', privateControllers.reviews);


module.exports = router;
