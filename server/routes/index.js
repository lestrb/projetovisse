import { Router } from 'express';
import TestRoute from './TestRoute.js';
import localRouter from './LocalRoute.js';
import authRouter from './authRoutes.js';
import capibaRouter from './capibaRoutes.js';
import comentarioRouter from './comentarioRoutes.js'; 
import pontuacaoRouter from './pontuacaoRoutes.js'; 

const router = Router();

router.use('/test', TestRoute);
router.use('/locais', localRouter);
router.use('/auth', authRouter);
router.use('/capiba', capibaRouter);
router.use('/comentarios', comentarioRouter); // NOVO
router.use('/pontuacao', pontuacaoRouter); // NOVO

export default router;