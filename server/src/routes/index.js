import { Router } from 'express';
import TestRoute from './TestRoute.js';

const router = Router();

router.use( '/test', TestRoute);

export default router;