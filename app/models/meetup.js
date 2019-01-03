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
    // logger.info('Meetup added successfully');
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

function getUpcomingMeetups() {
  return new Promise((resolve, reject) => {
    if (meetups.length === 0) {
      reject({ // eslint-disable-line prefer-promise-reject-errors
        status: 204,
        data: [],
      });
    }
    const upcomingMeetups = meetups.filter(meetup => meetup.happeningOn > helper.newDate());
    if (upcomingMeetups) {
      resolve(upcomingMeetups);
    } else {
      reject({ // eslint-disable-line prefer-promise-reject-errors
        status: 204,
        data: [],
      });
    }
  });
}

function rsvpMeetup(meetupId) {
  return new Promise((resolve, reject) => {
    helper.mustBeInArray(meetups, parseInt(meetupId, 10))
      .then((meetup) => {
        const id = helper.getNewId(rsvps);
        const title = meetup.topic;
        const rsvpDefaults = {
          meetup: meetupId,
          user: 1,
          respnse: 'Rsvp response',
          status: 'Yes',
        };
        const rsvp = { id, title, ...rsvpDefaults };
        rsvps.push(rsvp);
        helper.writeJSONFile(jsonFilename, rsvps);
        // logger.info('Rsvp added successfully');
        resolve(rsvp);
      })
      .catch(err => reject(err));
  });
}
module.exports = {
  insertMeetup,
  getAllMeetups,
  getMeetup,
  getUpcomingMeetups,
  rsvpMeetup,
};
