'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkFieldsPost = exports.isInt = exports.writeJSONFile = exports.mustBeInArray = exports.newDate = exports.getNewId = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNewId = function getNewId(array) {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }return 1;
};

var newDate = function newDate() {
  return new Date().toString();
};

var mustBeInArray = function mustBeInArray(array, id) {
  return new Promise(function (resolve, reject) {
    var row = array.find(function (r) {
      return r.id === id;
    });
    if (!row) {
      reject({ // eslint-disable-line prefer-promise-reject-errors
        status: 404,
        message: 'No meetup exits with id: ' + id
      });
    }
    resolve(row);
  });
};

var writeJSONFile = function writeJSONFile(filename, content) {
  _fs2.default.writeFileSync(filename, JSON.stringify(content));
};

var isInt = function isInt(id) {
  if (!Number.isInteger(parseInt(id, 10))) {
    return false;
  }return true;
};

function checkFieldsPost(fields, required) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = required[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;
      // eslint-disable-line no-restricted-syntax
      if (fields[key] === undefined || fields[key] === '') {
        return {
          status: 400,
          message: 'Validation failed, ' + key + ' field cannot be empty'
        };
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    status: 200,
    message: 'All fields ok'
  };
}

exports.getNewId = getNewId;
exports.newDate = newDate;
exports.mustBeInArray = mustBeInArray;
exports.writeJSONFile = writeJSONFile;
exports.isInt = isInt;
exports.checkFieldsPost = checkFieldsPost;