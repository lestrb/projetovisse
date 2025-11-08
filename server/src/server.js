import express from 'express';
import router from './routes/index.js'
import connectDB from '../Config/db.js';

const app = express()

app.use(router);

// Conect Database
connectDB();

app.listen(3000, () => {
    console.log('server running at  http://st:3000')
})