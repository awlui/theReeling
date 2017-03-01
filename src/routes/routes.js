var express = require('express');
var router = express.Router();

/* GET users listing. */
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

router.use(function(req,res) {
	res.status(404);
    res.send("404");
});
module.exports = router;
