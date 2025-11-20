import { Router } from 'express';
import { createLocal } from '../controllers/LocalController.js'; // função de lógica (controller)

const localRouter = Router();

localRouter.post('/', createLocal);
//localRouter.get('/', getAllLocais);
//localRouter.get('/:id', getLocalById);

export default localRouter;