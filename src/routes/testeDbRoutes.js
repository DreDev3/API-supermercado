import { Router } from "express";
import testeDbController from '../controllers/testeDbController';

const router = new Router();

router.get('/', testeDbController.testDatabaseConnection)

export default router;
