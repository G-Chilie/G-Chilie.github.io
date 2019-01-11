'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _question = require('../models/question');

var _helper = require('../lib/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', async function (req, res) {
  var required = ['createdBy', 'meetup', 'title', 'body'];
  var validated = _helper2.default.checkFieldsPost(req.body, required);
  if (validated.status === 400) {
    res.json({
      status: validated.status,
      message: validated.message
    });
  } else {
    await (0, _question.insertQuestion)(req.body).then(function (question) {
      res.json({
        status: 201,
        data: [question]
      });
    }).catch(function () {
      res.json({
        status: 500,
        message: 'Internal server error'
      });
    });
  }
});

router.patch('/:id/upvote', async function (req, res) {
  var id = req.params.id;

  await (0, _question.upvoteQuestion)(id).then(function (question) {
    res.json({
      status: 201,
      data: [question]
    });
  }).catch(function () {
    res.json({
      status: 500,
      data: 'Internal sever error'
    });
  });
});

router.patch('/:id/downvote', async function (req, res) {
  var id = req.params.id;

  await (0, _question.downvoteQuestion)(id).then(function (question) {
    res.json({
      status: 201,
      data: [question]
    });
  }).catch(function () {
    res.json({
      status: 500,
      message: 'Internal server error'
    });
  });
});

module.exports = router;