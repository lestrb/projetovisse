import { Router } from 'express';
import { 
    fazerCheckIn, 
    checkInComDesafio, 
    listarDesafios 
} from '../controllers/capibaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const capibaRouter = Router();

// Check-in simples
capibaRouter.post('/check-in', authMiddleware, fazerCheckIn);

// Check-in com desafio
capibaRouter.post('/check-in/location/challenge/:challengeId/requirement/:requirementId',
    authMiddleware,
    checkInComDesafio
);

// Listar desafios
capibaRouter.get('/desafios', authMiddleware, listarDesafios);

export default capibaRouter;