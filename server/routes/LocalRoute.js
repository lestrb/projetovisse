import { Router } from 'express';

import { 
    createLocal, 
    getAllLocais, 
    getLocalById, 
    updateLocal, 
    deleteLocal 
} from '../controllers/LocalController.js'; 

import authMiddleware from '../middlewares/authMiddleware.js';

const localRouter = Router();

localRouter.post('/', authMiddleware, createLocal);
localRouter.get('/', authMiddleware, getAllLocais);
localRouter.get('/:id', authMiddleware, getLocalById);
localRouter.put('/:id', authMiddleware, updateLocal);
localRouter.delete('/:id', authMiddleware, deleteLocal);

export default localRouter;