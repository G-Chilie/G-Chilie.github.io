import express from 'express';
import meetupRoute from './meetup';
import questionRoute from './question'

const router = express.Router();

module.exports = router;
router.use('/api/v1/meetups', meetupRoute);
router.use('/api/v1/questions', questionRoute);
