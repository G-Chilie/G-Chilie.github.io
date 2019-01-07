const express = require('express');

const questionModel = require('../models/question');

const helper = require('../lib/helper');

const router = express.Router();

router.post('/', async (req, res) => {
  const required = ['createdBy', 'meetup', 'title', 'body'];
  const validated = helper.checkFieldsPost(req.body, required);
  if (validated.status === 400) {
    res.json({
      status: validated.status,
      message: validated.message,
    });
  } else {
    await questionModel.insertQuestion(req.body)
      .then((question) => {
        res.json({
          status: 201,
          data: [question],
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

router.patch('/:id/upvote', async (req, res) => {
  const { id } = req.params;
  await questionModel.upvoteQuestion(id)
    .then((question) => {
      res.json({
        status: 201,
        data: [question],
      });
    })
    .catch(() => {
      res.json({
        status: 500,
        data: 'Internal sever error',
      });
    });
});

router.patch('/:id/downvote', async (req, res) => {
  const { id } = req.params;
  await questionModel.downvoteQuestion(id)
    .then((question) => {
      res.json({
        status: 201,
        data: [question],
      });
    })
    .catch(() => {
      res.json({
        status: 500,
        message: 'Internal server error',
      });
    });
});

module.exports = router;
