"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _testeDbController = require('../controllers/testeDbController'); var _testeDbController2 = _interopRequireDefault(_testeDbController);

const router = new (0, _express.Router)();

router.get('/', _testeDbController2.default.testDatabaseConnection)

exports. default = router;
