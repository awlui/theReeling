var express = require('express');
var router = express.Router();
var privateControllers = require('../controllers/privateControllers')
//Private Pages
var mime = require('mime');
var crypto = require('crypto');
var multer = require('multer');
var fs = require('fs');
var jo = require('jpeg-autorotate');
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	console.log("destination")
    cb(null, __dirname +'/../../public/uploads');
  },
  filename: function (req, file, cb) {
  	if (mime.extension(file.mimetype) === 'jpeg' || mime.extension(file.mimetype) ==='png') {
  		console.log(mime.extension(file.mimetype));
	    crypto.pseudoRandomBytes(16, function (err, raw) {
	    	var encryptedFile = raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype);
	    	console.log(encryptedFile)
	    	if (req.user.image) {
	    		try {
	    			fs.unlinkSync(__dirname + '/../../public/uploads/' + req.user.image);
	    		}
	    		catch(err) {
	    			console.log(err);
	    		}
	    	}
	    	req.user.image = encryptedFile;
	    	console.log(encryptedFile);
	      cb(null, encryptedFile);
	    });
	} else {
		cb(new Error('wrong file type'));
	}
  }
});
var upload = multer({ storage: storage,
					  limits: {
					  	fileSize: 10000000
					  }
 }).single('image');

var fileLoader = function(req, res, next) {
	console.log("STAGE1 fileloader")
	upload(req,res, function(err) {
		// Multer Error Handling
		if (err) {
			if (err.message === 'File too large') {
				// req.flash('error', 'file is too large, 10mb max');
				next(err);
				return;
			}
			if (err.message === "wrong file type") {
				// req.flash('error', 'file must be of type png or jpg')
				next(err);
				return;
			}
		}
		console.log(__dirname + "/../../public/uploads/" +req.user.image);
		jo.rotate(__dirname +'/../../public/uploads/' + req.user.image, {quality: 85, jobs: 100}, function(error, buffer, orientation) {
			console.log(orientation)
			if (error && error.code === jo.errors.correct_orientation) {
				console.log('The orientation of this image is already correct!');
			}
			fs.writeFile(__dirname +'/../../public/uploads/' + req.user.image, buffer, function(err) {
				if (err) {
					console.log("ERROR")
				} else {
					console.log("SUCCESS")
				}
			})
		} )
		next();
		return;
	})
};




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
