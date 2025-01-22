import { Router } from "express";
import userController from '../controllers/UserController';

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get('/', userController.index);
//router.get('/:id', userController.show);

router.get('/compradores', userController.listBuyers);
router.post('/', userController.store);
router.put('/',loginRequired, userController.update);
router.put('/desativar', loginRequired, userController.deactivateBuyer);
router.delete('/',loginRequired, userController.delete);

export default router;



/* 
Metodos de Controller 
index → lista todos os usuários → GET
store/create → cria um novo usuário → POST
delete → apaga um usuário → DELETE
show → mostra um usuário → GET
update → atualiza um usuário → PATCH ou PUT
*/
