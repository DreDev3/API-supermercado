import { Router } from "express";
import produtoController from '../controllers/ProdutoController';

import loginRequired from '../middlewares/loginRequired'

const router = new Router();

router.get('/', produtoController.index)
router.post('/', loginRequired, produtoController.store)
router.put('/:id', loginRequired, produtoController.update)
router.get('/:id', produtoController.show)
/* router.delete('/:id', loginRequired, produtoController.delete) */

/* router.get('/lista-produtos', produtoController.listProducts); */
router.put('/activate/:id', loginRequired, produtoController.activate);
router.put('/deactivate/:id', loginRequired, produtoController.deactivate);

export default router;
