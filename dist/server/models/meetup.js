'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var path = require('path');

var filename = path.join(__dirname, '../data/meetup.json');

var meetups = require('../data/meetup.json');

var helper = require('../lib/helper.js');

// const logger = require('../lib/logger');

var jsonFilename = path.join(__dirname, '../data/rsvp.json');

var rsvps = require('../data/rsvp.json');

function insertMeetup(newMeetup) {
  return new Promise(function (resolve) {
    var id = helper.getNewId(meetups);
    var createdOn = helper.newDate();
    var meetup = _extends({ id: id, createdOn: createdOn }, newMeetup);
    meetups.push(meetup);
    helper.writeJSONFile(filename, meetups);
    resolve(meetup);
  });
}

function getMeetup(id) {
  return new Promise(function (resolve, reject) {
    helper.mustBeInArray(meetups, parseInt(id, 10)).then(function (meetup) {
      return resolve(meetup);
    }).catch(function (err) {
      return reject(err);
    });
  });
}

function getAllMeetups() {
  return new Promise(function (resolve) {
    if (meetups.length === 0) {
      resolve({ // eslint-disable-line prefer-promise-reject-errors
        status: 204,
        data: []
      });
      return;
    }
    resolve(meetups);
  });
}

function getUpcomingMeetups() {
  return new Promise(function (resolve, reject) {
    if (meetups.length === 0) {
      reject({ // eslint-disable-line prefer-promise-reject-errors
        status: 204,
        data: []
      });
    }
    var upcomingMeetups = meetups.filter(function (meetup) {
      return meetup.happeningOn > helper.newDate();
    });
    if (upcomingMeetups) {
      resolve(upcomingMeetups);
    } else {
      reject({ // eslint-disable-line prefer-promise-reject-errors
        status: 204,
        data: []
      });
    }
  });
}

function rsvpMeetup(meetupId) {
  return new Promise(function (resolve, reject) {
    helper.mustBeInArray(meetups, parseInt(meetupId, 10)).then(function (meetup) {
      var id = helper.getNewId(rsvps);
      var title = meetup.topic;
      var rsvpDefaults = {
        meetup: meetupId,
        user: 1,
        respnse: 'Rsvp response',
        status: 'Yes'
      };
      var rsvp = _extends({ id: id, title: title }, rsvpDefaults);
      rsvps.push(rsvp);
      helper.writeJSONFile(jsonFilename, rsvps);
      resolve(rsvp);
    }).catch(function (err) {
      return reject(err);
    });
  });
}
module.exports = {
  insertMeetup: insertMeetup,
  getAllMeetups: getAllMeetups,
  getMeetup: getMeetup,
  getUpcomingMeetups: getUpcomingMeetups,
  rsvpMeetup: rsvpMeetup
};