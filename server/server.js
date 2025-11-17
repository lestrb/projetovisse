import express from 'express';
import router from './src/routes/index.js';
import connectDB from './Config/db.js';

const app = express();

app.use(express.json()); // Middleware para o Express conseguir "ler" o JSON do body da requisição

app.use(router); // As rotas devem vem depois do middleware de json

// Conect Database
connectDB();

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000'); // Anterior: 'server running at http://st:3000'
}) 