import { Router } from "express";
import homeController from '../controllers/HomeController';

const router = new Router();

//rota de teste
const { testDatabaseConnection } = require('./controllers/HomeController'); // Caminho correto do seu controlador
//

router.get('/', homeController.index)
router.get('/test-db', testDatabaseConnection);

export default router;
