import { Router } from 'express';
import TestRoute from './TestRoute.js';
import localRouter from './LocalRoute.js'; // Importa as rotas de locais
import authRouter from './authRoutes.js';

const router = Router();

router.use('/test', TestRoute);
router.use('/locais', localRouter);
router.use('/auth', authRouter);

export default router;