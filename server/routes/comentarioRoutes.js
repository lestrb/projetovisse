import { Router } from 'express';
import {
    criarComentario,
    listarComentarios,
    atualizarComentario,
    deletarComentario
} from '../controllers/comentarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const comentarioRouter = Router();

// Criar comentário (requer autenticação)
comentarioRouter.post('/', authMiddleware, criarComentario);

// Listar comentários de um local (público)
comentarioRouter.get('/local/:local_id', listarComentarios);

// Atualizar comentário (requer autenticação e ser o autor)
comentarioRouter.put('/:id', authMiddleware, atualizarComentario);

// Deletar comentário (requer autenticação e ser o autor)
comentarioRouter.delete('/:id', authMiddleware, deletarComentario);


export default comentarioRouter;