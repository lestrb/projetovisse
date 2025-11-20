// This file contains the authentication routes for the application.
import { Router } from 'express';
import { registro, login } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', registro);
authRouter.post('/login', login);

export default authRouter;