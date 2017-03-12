var express = require('express');
var router = express.Router();
var privateRoutes = require('./privateRoutes');
var publicRoutes = require('./publicRoutes');
var authRoutes = require('./authenticationRoutes');

router.use(publicRoutes);
router.use(privateRoutes);
router.use(authRoutes);


module.exports = router;