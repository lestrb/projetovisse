import { Router } from 'express';
import { createLocal } from '../controllers/LocalController.js'; // função de lógica (controller)
import authMiddleware from '../middlewares/authMiddleware.js';

const localRouter = Router();

localRouter.post('/', authMiddleware, createLocal);
//localRouter.get('/', getAllLocais);
//localRouter.get('/:id', getLocalById);

export default localRouter;