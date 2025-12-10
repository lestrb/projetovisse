import { Router } from 'express';

import { 
    createLocal, 
    getAllLocais, 
    getLocalById, 
    updateLocal, 
    deleteLocal,
    curtirLocal
} from '../controllers/LocalController.js'; 

import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const localRouter = Router();

// Criar local 
localRouter.post('/', authMiddleware, upload.single('imagem'), createLocal);

// Atualizar local 
localRouter.put('/:id', authMiddleware, upload.single('imagem'), updateLocal);


localRouter.get('/', getAllLocais);
localRouter.get('/:id', getLocalById);
localRouter.delete('/:id', authMiddleware, deleteLocal);
localRouter.post('/:id/curtir', authMiddleware, curtirLocal);

export default localRouter;