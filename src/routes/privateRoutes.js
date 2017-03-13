var express = require('express');
var router = express.Router();
var privateControllers = require('../controllers/privateControllers');
var helpers = require('./helper.js');
//Private Pages
var fileloader = require('./multer');


//GET
router.get('/account', helpers.ensureAuthenticated, privateControllers.account);

router.get('/addReview/:movieId', helpers.ensureAuthenticated, privateControllers.addReviewForm);

router.get('/editReview/:reviewId', helpers.ensureAuthenticated, privateControllers.editReviewForm);

router.get('/reviews', helpers.ensureAuthenticated, privateControllers.reviews);

router.get('/editProfile', helpers.ensureAuthenticated, privateControllers.editProfileForm); 

router.get('/deleteReview/:reviewId', helpers.ensureAuthenticated, privateControllers.deleteReview);

// router.get('/deleteUser', privateControllers.deleteUser);

//POST

router.post('/addReview/:movieId', helpers.ensureAuthenticated, privateControllers.addReview);


router.post('/editReview/:reviewId', helpers.ensureAuthenticated, privateControllers.editReview);


router.post('/editProfile', helpers.ensureAuthenticated, fileLoader, privateControllers.editProfile);

module.exports = router;
