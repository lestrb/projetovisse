import { Router } from 'express';

import { 
    createLocal, 
    getAllLocais, 
    getLocalById, 
    updateLocal, 
    deleteLocal,
    curtirLocal,
    fazerCheckInVisse
} from '../controllers/LocalController.js'; 

import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const localRouter = Router();

// Criar local 
localRouter.post('/', authMiddleware, upload.single('imagem'), createLocal);

// Validar presença física e ganhar pontos
localRouter.post('/check-in', authMiddleware, fazerCheckInVisse);

// Atualizar local 
localRouter.put('/:id', authMiddleware, upload.single('imagem'), updateLocal);


localRouter.get('/', getAllLocais);
localRouter.get('/:id', getLocalById);
localRouter.delete('/:id', authMiddleware, deleteLocal);
localRouter.post('/:id/curtir', authMiddleware, curtirLocal);

export default localRouter;