import { Router } from 'express';
import {
    buscarPontuacao,
    converterParaCapiba
} from '../controllers/pontuacaoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const pontuacaoRouter = Router();

// Buscar pontuação do usuário logado
pontuacaoRouter.get('/minha', authMiddleware, buscarPontuacao);

// Converter pontos Visse em Capibas
pontuacaoRouter.post('/converter', authMiddleware, converterParaCapiba);


export default pontuacaoRouter;