var express = require('express');
var router = express.Router();
var privateControllers = require('../controllers/privateControllers')
//Private Pages

//GET
router.get('/account', privateControllers.account);

router.get('/addReview/:movieId', privateControllers.addReviewForm);

router.get('/editReview/:reviewId', privateControllers.editReviewForm);

router.get('/editProfile', privateControllers.editProfile);

router.get('/reviews', privateControllers.reviews);

//POST

router.post('/addReview/:movieId', privateControllers.addReview);



module.exports = router;
