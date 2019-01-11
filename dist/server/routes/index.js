'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetup = require('./meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _question = require('./question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

module.exports = router;
router.use('/api/v1/meetups', _meetup2.default);
router.use('/api/v1/questions', _question2.default);