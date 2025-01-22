"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _CartController = require('../controllers/CartController'); var _CartController2 = _interopRequireDefault(_CartController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/', _loginRequired2.default, _CartController2.default.index);
router.post('/', _loginRequired2.default, _CartController2.default.store);
router.delete('/:id', _loginRequired2.default, _CartController2.default.delete);
router.delete('/', _loginRequired2.default, _CartController2.default.clear);

exports. default = router;
