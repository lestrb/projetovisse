import { Router } from 'express';
import TestRoute from './TestRoute.js';
import localRouter from './LocalRoute.js'; // Importa as rotas de locais

const router = Router();

router.use('/test', TestRoute);
router.use('/locais', localRouter); // Quando a requisição tiver '/locais', 'localRouter' tratará

export default router;