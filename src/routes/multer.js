var mime = require('mime');
var crypto = require('crypto');
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../public/uploads');
  },
  filename: function (req, file, cb) {
  	if (mime.extension(file.mimetype) === 'jpeg' || mime.extension(file.mimetype) ==='png') {
	    crypto.pseudoRandomBytes(16, function (err, raw) {
	    	var encryptedFile = raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype);
	    	if (req.user.image) {
	    		try {
	    			fs.unlinkSync('./public/uploads/' + req.user.image);
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
 }).single('profile');

module.exports = fileLoader = function(req, res, next) {
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
		next();
		return;
	})
};