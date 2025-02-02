"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _HomeController = require('../controllers/HomeController'); var _HomeController2 = _interopRequireDefault(_HomeController);

const router = new (0, _express.Router)();

//rota de teste
 // Caminho correto do seu controlador
//

router.get('/', _HomeController2.default.index)
router.get('/test-db', _HomeController.testDatabaseConnection);

exports. default = router;
