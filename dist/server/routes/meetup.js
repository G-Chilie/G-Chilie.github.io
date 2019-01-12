'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetup = require('../models/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _helper = require('../lib/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', async function (req, res) {
  var required = ['title', 'location', 'happeningOn', 'tags', 'images'];
  var validated = _helper2.default.checkFieldsPost(req.body, required);
  if (validated.status === 400) {
    res.json({
      status: validated.status,
      message: validated.message
    });
  } else {
    await _meetup2.default.insertMeetup(req.body).then(function (meetup) {
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
  await _meetup2.default.getUpcomingMeetups().then(function (meetups) {
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

  await _meetup2.default.getMeetup(id).then(function (meetup) {
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
  await _meetup2.default.getAllMeetups().then(function (meetups) {
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

  await _meetup2.default.rsvpMeetup(id).then(function (rsvp) {
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