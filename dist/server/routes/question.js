'use strict';

var express = require('express');

var questionModel = require('../models/question');

var helper = require('../lib/helper');

var router = express.Router();

router.post('/', async function (req, res) {
  var required = ['createdBy', 'meetup', 'title', 'body'];
  var validated = helper.checkFieldsPost(req.body, required);
  if (validated.status === 400) {
    res.json({
      status: validated.status,
      message: validated.message
    });
  } else {
    await questionModel.insertQuestion(req.body).then(function (question) {
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

  await questionModel.upvoteQuestion(id).then(function (question) {
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

  await questionModel.downvoteQuestion(id).then(function (question) {
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