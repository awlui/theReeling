// The file loader middleware utilizes several submiddleware to upload profile images to the application server. I use multer to allow file upload with a few constraints on file extension and file size. I also use
// jpeg-autorotate to deal with screwy orientation. The jpeg-autorotate middleware overwrites the orientation property of the EXIF tag on the jpeg file which fixes the problem.


var mime = require('mime');
var crypto = require('crypto');
var multer = require('multer');
var fs = require('fs');
var jo = require('jpeg-autorotate');
var path = require('path');



// Multer Configuration to apply file size limits and hashes jpeg filename before placing into database; Image itself resides in application server; May implement buffer to write to database in the future

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname +'/../../public/uploads');
  },
  filename: function (req, file, cb) {
  	if (mime.extension(file.mimetype) === 'jpeg' || mime.extension(file.mimetype) ==='png') {
	    crypto.pseudoRandomBytes(16, function (err, raw) {
	    	var encryptedFile = raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype);
	    	if (req.user.image) {
	    		try {
	    			fs.unlinkSync(__dirname + '/../../public/uploads/' + req.user.image);
	    		}
	    		catch(err) {
	    			console.log(err);
	    		}
	    	}
	    	req.user.image = encryptedFile;
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

module.exports = fileLoader = function(req, res, next) {
	upload(req,res, function(err) {
		// Multer Error Handling
		if (err) {
			if (err.message === 'File too large') {
				// req.flash('error', 'file is too large, 10mb max');
				req.flash("error", "File must be smaller than 10mb, smaller the better; heroku free-tier problems :P");
				res.redirect("/editProfile");
				return;
			}
			if (err.message === "wrong file type") {
				// req.flash('error', 'file must be of type png or jpg')
				req.flash("error", "File type must be png or jpeg");
				res.redirect('/editProfile');
				return;
			}
		}
		jo.rotate(__dirname +'/../../public/uploads/' + req.user.image, {quality: 85, jobs: 100}, function(error, buffer, orientation) {
			if (error && error.code === jo.errors.correct_orientation) {
				console.log('The orientation of this image is already correct!');
			}
			fs.writeFile(__dirname +'/../../public/uploads/' + req.user.image, buffer, function(err) {
				if (err) {
					next(err);
				}
			})
		})
		next();
		return;
	})
};