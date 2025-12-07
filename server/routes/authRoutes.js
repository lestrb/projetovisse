import { Router } from 'express';
import { login } from '../controllers/authController.js';

const authRouter = Router();

// Login via API Capiba
authRouter.post('/login', login);

export default authRouter;