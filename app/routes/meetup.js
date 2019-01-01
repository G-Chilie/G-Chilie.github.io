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