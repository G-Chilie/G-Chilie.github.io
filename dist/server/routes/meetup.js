'use strict';

var express = require('express');

var meetupModel = require('../models/meetup');

var helper = require('../lib/helper');

var router = express.Router();

router.post('/', async function (req, res) {
  var required = ['title', 'location', 'happeningOn', 'tags', 'images'];
  var validated = helper.checkFieldsPost(req.body, required);
  if (validated.status === 400) {
    res.json({
      status: validated.status,
      message: validated.message
    });
  } else {
    await meetupModel.insertMeetup(req.body).then(function (meetup) {
      res.json({
        status: 201,
        data: [meetup]
      });
    }).catch(function () {
      res.json({
        status: 500,
        message: 'Internal server error'
      });
    });
  }
});

router.get('/upcoming', async function (req, res) {
  await meetupModel.getUpcomingMeetups().then(function (meetups) {
    return res.json({
      status: 200,
      data: meetups
    });
  }).catch(function (err) {
    if (err.status === 204) {
      res.json({
        status: err.status,
        data: err.data
      });
    } else {
      res.json({
        status: 500,
        data: []
      });
    }
  });
});

router.get('/:id', async function (req, res) {
  var id = req.params.id;

  await meetupModel.getMeetup(id).then(function (meetup) {
    return res.json({
      status: 200,
      data: [meetup]
    });
  }).catch(function (err) {
    if (err.status === 404) {
      res.json({
        status: err.status,
        message: err.message
      });
    } else {
      res.json({
        status: 500,
        message: 'Internal server error'
      });
    }
  });
});

router.get('/', async function (req, res) {
  await meetupModel.getAllMeetups().then(function (meetups) {
    return res.json({
      status: 200,
      data: meetups
    });
  }).catch(function () {
    return res.json({
      status: 500,
      error: 'Internal server error'
    });
  });
});

router.post('/:id/rsvps', async function (req, res) {
  var id = req.params.id;

  await meetupModel.rsvpMeetup(id).then(function (rsvp) {
    res.json({
      status: 201,
      data: [rsvp]
    });
  }).catch(function (err) {
    if (err.status === 404) {
      res.json({
        status: err.status,
        message: err.message
      });
    } else {
      res.json({
        status: 500,
        message: err,
        data: []
      });
    }
  });
});

module.exports = router;