import { Router } from 'express';
import cartController from '../controllers/CartController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, cartController.index);
router.post('/', loginRequired, cartController.store);
router.delete('/:id', loginRequired, cartController.delete);
router.delete('/', loginRequired, cartController.clear);

export default router;
