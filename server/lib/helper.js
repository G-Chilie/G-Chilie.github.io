import fs from 'fs';

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } return 1;
};

const newDate = () => new Date().toString();

const mustBeInArray = (array, id) => new Promise((resolve, reject) => {
  const row = array.find(r => r.id === id);
  if (!row) {
    reject({ // eslint-disable-line prefer-promise-reject-errors
      status: 404,
      message: `No meetup exits with id: ${id}`,
    });
  }
  resolve(row);
});

const writeJSONFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content));
};

const isInt = (id) => {
  if (!Number.isInteger(parseInt(id, 10))) {
    return false;
  } return true;
};

function checkFieldsPost(fields, required) {
  for (const key of required) { // eslint-disable-line no-restricted-syntax
    if (fields[key] === undefined || fields[key] === '') {
      return {
        status: 400,
        message: `Validation failed, ${key} field cannot be empty`,
      };
    }
  }
  return {
    status: 200,
    message: 'All fields ok',
  };
}

export {
  getNewId,
  newDate,
  mustBeInArray,
  writeJSONFile,
  isInt,
  checkFieldsPost,
};
