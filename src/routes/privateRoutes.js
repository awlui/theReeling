var express = require('express');
var router = express.Router();
var privateControllers = require('../controllers/privateControllers')
//Private Pages
var fileLoader = require('./multer');
//GET
router.get('/account', privateControllers.account);

router.get('/addReview/:movieId', privateControllers.addReviewForm);

router.get('/editReview/:reviewId', privateControllers.editReviewForm);

router.get('/reviews', privateControllers.reviews);

router.get('/editProfile', privateControllers.editProfileForm); 


//POST

router.post('/addReview/:movieId', privateControllers.addReview);


router.post('/editReview/:reviewId', privateControllers.editReview);


router.post('/editProfile', fileLoader, privateControllers.editProfile);

module.exports = router;
