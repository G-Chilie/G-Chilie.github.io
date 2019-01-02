const path = require('path');

const filename = path.join(__dirname, '../data/meetup.json');

const meetups = require('../data/meetup.json');

const helper = require('../lib/helper.js');

const logger = require('../lib/logger');

const jsonFilename = path.join(__dirname, '../data/rsvp.json');

const rsvps = require('../data/rsvp.json');

function insertMeetup(newMeetup) {
    return new Promise((resolve) => {
      const id = helper.getNewId(meetups);
      const createdOn = helper.newDate();
      const meetup = { id, createdOn, ...newMeetup };
      meetups.push(meetup);
      helper.writeJSONFile(filename, meetups);
      logger.info('Meetup added successfully');
      resolve(meetup);
    });
  }

  function getMeetup(id) {
    return new Promise((resolve, reject) => {
      helper.mustBeInArray(meetups, parseInt(id, 10))
        .then(meetup => resolve(meetup))
        .catch(err => reject(err));
    });
  }

  function getAllMeetups() { 
    return new Promise((resolve) => {
      if (meetups.length === 0) {
        resolve({ // eslint-disable-line prefer-promise-reject-errors
          status: 204,
          data: [],
        });
        return;
      }
      resolve(meetups);
    });
  }

  function checkFieldsPost(fields, required) {
    for (const key of required) { // eslint-disable-line no-restricted-syntax
      if (fields[key] === undefined || fields[key] === '') {
        logger.info(`${key} is empty, validation failed`);
        return {
          status: 400,
          message: `Validation failed, ${key} field cannot be empty`,
        };
      }
    }
    logger.info('All fields provided, validation successful');
    return {
      status: 200,
      message: 'All fields ok',
    };
  }
  
  module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    isInt,
    checkFieldsPost,
  };