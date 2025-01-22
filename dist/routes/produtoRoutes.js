"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ProdutoController = require('../controllers/ProdutoController'); var _ProdutoController2 = _interopRequireDefault(_ProdutoController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/', _ProdutoController2.default.index)
router.post('/', _loginRequired2.default, _ProdutoController2.default.store)
router.put('/:id', _loginRequired2.default, _ProdutoController2.default.update)
router.get('/:id', _ProdutoController2.default.show)
/* router.delete('/:id', loginRequired, produtoController.delete) */

/* router.get('/lista-produtos', produtoController.listProducts); */
router.put('/activate/:id', _loginRequired2.default, _ProdutoController2.default.activate);
router.put('/deactivate/:id', _loginRequired2.default, _ProdutoController2.default.deactivate);

exports. default = router;
