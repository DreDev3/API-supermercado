"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/', _UserController2.default.index);
//router.get('/:id', userController.show);

router.get('/compradores', _UserController2.default.listBuyers);
router.post('/', _UserController2.default.store);
router.put('/',_loginRequired2.default, _UserController2.default.update);
router.put('/desativar', _loginRequired2.default, _UserController2.default.deactivateBuyer);
router.delete('/',_loginRequired2.default, _UserController2.default.delete);

exports. default = router;



/* 
Metodos de Controller 
index → lista todos os usuários → GET
store/create → cria um novo usuário → POST
delete → apaga um usuário → DELETE
show → mostra um usuário → GET
update → atualiza um usuário → PATCH ou PUT
*/
