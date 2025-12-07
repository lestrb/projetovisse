// server.js - SUBSTITUA TODO O CÓDIGO POR ESTE:
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import connectDB from './Config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); 

app.use(cors());

app.use(express.json());
app.use(router);

// Conecta ao banco
connectDB();


app.listen(3002, () => {
    console.log(`✅ Servidor rodando em http://localhost:3002`);
}).on('error', (err) => {
    console.error(' Erro ao iniciar servidor:', err);
});