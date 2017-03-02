var express = require('express');
var router = express.Router();

/* GET users listing. */

//Public Pages
router.get('/', function(req, res) {
	res.render('index', {});
});

router.get('/login', function(req,res) {
	res.render('login', {});
});

router.get('/search', function(req,res) {
	res.render('search', {});
});

router.get('/movieInfo', function(req,res) {
	res.render('movieInfo', {});
});


router.get('/profile', function(req, res) {
	res.render('profile', {});
});


//Private Pages

router.get('/account', function(req,res) {
	res.render('account', {});
});

router.get('/addReview', function(req, res) {
	res.render('addReview', {});
});

router.get('/editReview', function(req, res) {
	res.render('editReview', {});
});

router.get('/editProfile', function(req,res) {
	res.render('editProfile', {});
});

router.get('/reviews', function(req, res) {
	res.render('reviews', {});
});

router.use(function(req,res) {
	res.status(404);
    res.send("404");
});
module.exports = router;
