import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js';
import connectDB from './Config/db.js';
import dotenv from 'dotenv';

// Para usar __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express(); 

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(router); 

// Conecta ao banco
connectDB();

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Upload de imagens habilitado em http://localhost:${PORT}/uploads`);
}).on('error', (err) => {
    console.error('Erro ao iniciar servidor:', err);
});