const express = require('express');

const meetupRoute = require('./meetup');
const questionRoute = require('./question');

const router = express.Router();

module.exports = router;
router.use('/api/v1/meetups', meetupRoute);
router.use('/api/v1/questions', questionRoute);
