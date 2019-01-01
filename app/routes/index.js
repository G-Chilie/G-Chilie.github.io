const express = require('express');

const meetupRoute = require('./meetup');

const router = express.Router();

module.exports = router;
router.use('/api/v1/meetups', meetupRoute);
