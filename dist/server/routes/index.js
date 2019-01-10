'use strict';

var express = require('express');

var meetupRoute = require('./meetup');
var questionRoute = require('./question');

var router = express.Router();

module.exports = router;
router.use('/api/v1/meetups', meetupRoute);
router.use('/api/v1/questions', questionRoute);