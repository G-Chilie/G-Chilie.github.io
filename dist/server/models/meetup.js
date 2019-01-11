'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rsvpMeetup = exports.getUpcomingMeetups = exports.getMeetup = exports.getAllMeetups = exports.insertMeetup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _meetup = require('../data/meetup.json');

var _meetup2 = _interopRequireDefault(_meetup);

var _helper = require('../lib/helper.js');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filename = _path2.default.join(__dirname, '../data/meetup.json');

var jsonFilename = _path2.default.join(__dirname, '../data/rsvp.json');

var rsvps = require('../data/rsvp.json');

function insertMeetup(newMeetup) {
  return new Promise(function (resolve) {
    var id = _helper2.default.getNewId(_meetup2.default);
    var createdOn = _helper2.default.newDate();
    var meetup = _extends({ id: id, createdOn: createdOn }, newMeetup);
    _meetup2.default.push(meetup);
    _helper2.default.writeJSONFile(filename, _meetup2.default);
    resolve(meetup);
  });
}

function getMeetup(id) {
  return new Promise(function (resolve, reject) {
    _helper2.default.mustBeInArray(_meetup2.default, parseInt(id, 10)).then(function (meetup) {
      return resolve(meetup);
    }).catch(function (err) {
      return reject(err);
    });
  });
}

function getAllMeetups() {
  return new Promise(function (resolve) {
    if (_meetup2.default.length === 0) {
      resolve({ // eslint-disable-line prefer-promise-reject-errors
        status: 204,
        data: []
      });
      return;
    }
    resolve(_meetup2.default);
  });
}

function getUpcomingMeetups() {
  return new Promise(function (resolve, reject) {
    if (_meetup2.default.length === 0) {
      reject({ // eslint-disable-line prefer-promise-reject-errors
        status: 204,
        data: []
      });
    }
    var upcomingMeetups = _meetup2.default.filter(function (meetup) {
      return meetup.happeningOn > _helper2.default.newDate();
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
    _helper2.default.mustBeInArray(_meetup2.default, parseInt(meetupId, 10)).then(function (meetup) {
      var id = _helper2.default.getNewId(rsvps);
      var title = meetup.topic;
      var rsvpDefaults = {
        meetup: meetupId,
        user: 1,
        respnse: 'Rsvp response',
        status: 'Yes'
      };
      var rsvp = _extends({ id: id, title: title }, rsvpDefaults);
      rsvps.push(rsvp);
      _helper2.default.writeJSONFile(jsonFilename, rsvps);
      resolve(rsvp);
    }).catch(function (err) {
      return reject(err);
    });
  });
}
exports.insertMeetup = insertMeetup;
exports.getAllMeetups = getAllMeetups;
exports.getMeetup = getMeetup;
exports.getUpcomingMeetups = getUpcomingMeetups;
exports.rsvpMeetup = rsvpMeetup;