import { Router } from 'express'
const TestRoute = Router();

TestRoute.get('/', (req, res) => {
    res.status(200).json({message: 'Test route!'})
});

export default TestRoute;