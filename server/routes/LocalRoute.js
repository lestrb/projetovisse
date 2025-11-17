import { Router } from 'express';
import { createLocal } from '../controllers/LocalController.js'; // função de lógica (controller)

const localRouter = Router();

// Endpoint: quando uma requisição POST chegar em '/', executa a função createLocal
localRouter.post('/', createLocal);

// Em breve:
// localRouter.get('/', getAllLocais);
// localRouter.get('/:id', getLocalById);
// localRouter.post('/:id/descricao', addDescricaoToLocal);

export default localRouter;