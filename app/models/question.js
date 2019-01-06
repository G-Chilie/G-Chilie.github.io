const path = require('path');

const questions = require('../data/question.json');

const helper = require('../lib/helper.js');

// const logger = require('../lib/logger');


const filename = path.join(__dirname, '../data/question.json');


function insertQuestion(newQuestion) {
  return new Promise((resolve) => {
    const id = helper.getNewId(questions);
    const createdOn = helper.newDate();
    const votes = 0;
    const question = {
      id,
      createdOn,
      ...newQuestion,
      votes,
    };
    questions.push(question);
    helper.writeJSONFile(filename, questions);
    // logger.info('Question added successfully');
    resolve(question);
  });
}

function upvoteQuestion(id) {
  return new Promise((resolve, reject) => {
    helper.mustBeInArray(questions, parseInt(id, 10))
      .then((question) => {
        const index = questions.findIndex(q => q.id === question.id);
        const newId = { id: question.id };
        const votes = { votes: question.votes + 1 };
        const date = {
          createdOn: question.createdOn,
          updatedOn: helper.newDate(),
        };
        questions[index] = {
          ...newId, ...date, ...votes,
        };
        helper.writeJSONFile(filename, questions);
        resolve(questions[index]);
      })
      .catch(err => reject(err));
  });
}

function downvoteQuestion(id) {
  return new Promise((resolve, reject) => {
    helper.mustBeInArray(questions, parseInt(id, 10))
      .then((question) => {
        const index = questions.findIndex(q => q.id === question.id);
        const newId = { id: question.id };
        const votes = { votes: question.votes - 1 };
        const date = {
          createdOn: question.createdOn,
          updatedOn: helper.newDate(),
        };
        questions[index] = {
          ...newId, ...date, ...votes,
        };
        helper.writeJSONFile(filename, questions);
        resolve(questions[index]);
      })
      .catch(err => reject(err));
  });
}

module.exports = {
  insertQuestion,
  upvoteQuestion,
  downvoteQuestion,
};
