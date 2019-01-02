const path = require('path');

const questions = require('../data/question.json');

const helper = require('../lib/helper.js');

const logger = require('../lib/logger');


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
    logger.info('Question added successfully');
    resolve(question);
  });
}

module.exports = {
    insertQuestion,
  };