const fs = require('fs');

const logger = require('../lib/logger');

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } return 1;
};

const newDate = () => new Date().toString();

const mustBeInArray = (array, id) => {
    return new Promise((resolve, reject) => {
      const row = array.find(r => r.id === id);
      if (!row) {
        reject({ // eslint-disable-line prefer-promise-reject-errors
          status: 404,
          message: `No meetup exits with id: ${id}`,
        });
      }
      resolve(row);
    });
  }

const writeJSONFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content));
  }

const isInt = (id) => {
    if (!Number.isInteger(parseInt(id, 10))) {
      return false;
    } return true;
  }

