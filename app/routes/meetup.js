const express = require('express');

const meetupModel = require('../models/meetup');

const helper = require('../lib/helper');

const router = express.Router();

router.post('/', async (req, res) => {
  const required = ['title', 'location', 'happeningOn', 'tags', 'images'];
  const validated = helper.checkFieldsPost(req.body, required);
  if (validated.status === 400) {
    res.json({
      status: validated.status,
      data: validated.message,
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