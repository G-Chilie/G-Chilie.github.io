const fs = require('fs');

const logger = require('../lib/logger');

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } return 1;
};

const newDate = () => new Date().toString();

