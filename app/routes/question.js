const express = require('express');

const questionModel = require('../models/question_model');

const helper = require('../lib/helper');

const router = express.Router();

router.post('/', async (req, res) => {
  const required = ['createdBy', 'meetup', 'title', 'body'];
  const validated = helper.checkFieldsPost(req.body, required);
  if (validated.status === 400) {
    res.json({
      status: 400,
      data: [],
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
          data: [],
        });
      });
  }
});

module.exports = router;