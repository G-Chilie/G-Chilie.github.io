import express from 'express';

import meetupModel from '../models/meetup';

import helper from '../lib/helper';

const router = express.Router();

router.post('/', async (req, res) => {
  const required = ['title', 'location', 'happeningOn', 'tags', 'images'];
  const validated = helper.checkFieldsPost(req.body, required);
  if (validated.status === 400) {
    res.json({
      status: validated.status,
      message: validated.message,
    });
  } else {
    await meetupModel.insertMeetup(req.body)
      .then((meetup) => {
        res.json({
          status: 201,
          data: [meetup],
        });
      })
      .catch(() => {
        res.json({
          status: 500,
          message: 'Internal server error',
        });
      });
  }
});

router.get('/upcoming', async (req, res) => {
  await meetupModel.getUpcomingMeetups()
    .then(meetups => res.json({
      status: 200,
      data: meetups,
    }))
    .catch((err) => {
      if (err.status === 204) {
        res.json({
          status: err.status,
          data: err.data,
        });
      } else {
        res.json({
          status: 500,
          data: [],
        });
      }
    });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  await meetupModel.getMeetup(id)
    .then(meetup => res.json({
      status: 200,
      data: [meetup],
    }))
    .catch((err) => {
      if (err.status === 404) {
        res.json({
          status: err.status,
          message: err.message,
        });
      } else {
        res.json({
          status: 500,
          message: 'Internal server error',
        });
      }
    });
});

router.get('/', async (req, res) => {
  await meetupModel.getAllMeetups()
    .then(meetups => res.json({
      status: 200,
      data: meetups,
    }))
    .catch(() => res.json({
      status: 500,
      error: 'Internal server error',
    }));
});

router.post('/:id/rsvps', async (req, res) => {
  const { id } = req.params;
  await meetupModel.rsvpMeetup(id)
    .then((rsvp) => {
      res.json({
        status: 201,
        data: [rsvp],
      });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.json({
          status: err.status,
          message: err.message,
        });
      } else {
        res.json({
          status: 500,
          message: err,
          data: [],
        });
      }
    });
});


module.exports = router;
