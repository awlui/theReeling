var express = require('express');
var router = express.Router();
var privateControllers = require('../controllers/privateControllers')
//Private Pages

//GET
router.get('/account', privateControllers.account);

router.get('/addReview/:movieId', privateControllers.addReviewForm);

router.get('/editReview/:reviewId', privateControllers.editReviewForm);

router.get('/reviews', privateControllers.reviews);

router.get('/editProfile/:userId', privateControllers.editProfileForm); 


//POST

router.post('/addReview/:movieId', privateControllers.addReview);


router.post('/editReview/:reviewId', privateControllers.editReview);

router.post('/editProfile')

module.exports = router;
