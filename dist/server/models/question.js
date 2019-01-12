'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.insertQuestion = insertQuestion;
exports.upvoteQuestion = upvoteQuestion;
exports.downvoteQuestion = downvoteQuestion;
var path = require('path'); // inport path 'path'

var questions = require('../data/question.json'); // import from 

var helper = require('../lib/helper.js');

// const logger = require('../lib/logger');


var filename = path.join(__dirname, '../data/question.json');

function insertQuestion(newQuestion) {
  return new Promise(function (resolve) {
    var id = helper.getNewId(questions);
    var createdOn = helper.newDate();
    var votes = 0;
    var question = _extends({
      id: id,
      createdOn: createdOn
    }, newQuestion, {
      votes: votes
    });
    questions.push(question);
    helper.writeJSONFile(filename, questions);
    resolve(question);
  });
}

function upvoteQuestion(id) {
  return new Promise(function (resolve, reject) {
    helper.mustBeInArray(questions, parseInt(id, 10)).then(function (question) {
      var index = questions.findIndex(function (q) {
        return q.id === question.id;
      });
      var newId = { id: question.id };
      var votes = { votes: question.votes + 1 };
      var date = {
        createdOn: question.createdOn,
        updatedOn: helper.newDate()
      };
      questions[index] = _extends({}, newId, date, votes);
      helper.writeJSONFile(filename, questions);
      resolve(questions[index]);
    }).catch(function (err) {
      return reject(err);
    });
  });
}

function downvoteQuestion(id, newQuestion) {
  return new Promise(function (resolve, reject) {
    helper.mustBeInArray(questions, parseInt(id, 10)).then(function (question) {
      var index = questions.findIndex(function (q) {
        return q.id === question.id;
      });
      var newId = { id: question.id };
      var votes = { votes: question.votes - 1 };
      var date = {
        createdOn: question.createdOn,
        updatedOn: helper.newDate()
      };
      questions[index] = _extends({}, newId, date, newQuestion, votes);
      helper.writeJSONFile(filename, questions);
      resolve(questions[index]);
    }).catch(function (err) {
      return reject(err);
    });
  });
}