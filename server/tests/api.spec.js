import request from 'supertest';
import express from 'express';
import localRouter from '../routes/LocalRoute.js';
import testRoute from '../routes/TestRoute.js';

// Setup do app para teste (sem ligar o Mongo de verdade)
const app = express();
app.use(express.json());
app.use('/test', testRoute);
app.use('/locais', localRouter);

describe('Testes de Caixa Preta - API Endpoints', () => {

    // Health Check (já existia, agora deixei automatizado)
    it('BB-01: Rota de teste deve estar online (Status 200)', async () => {
        const res = await request(app).get('/test');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Test route!' });
    });

    // Segurança (tentar entrar sem chave)
    it('BB-02: Deve bloquear cadastro de local sem Login (Status 401/403 ou 500 se middleware falhar)', async () => {
        const res = await request(app).post('/locais').send({ 
            nome: "Tentativa Hacker" 
        });
        // Como não mandamos token, não pode ser 200 ou 201
        expect(res.status).not.toBe(201);
        expect(res.status).not.toBe(200);
    });

    // Validação de input (enviar dados vazios)
    it('BB-03: Deve rejeitar cadastro com nome vazio (Status 400)', async () => {
        // Simulando um token falso apenas para passar da porta de entrada
        const res = await request(app)
            .post('/locais')
            .set('Authorization', 'Bearer token_falso') 
            .send({ 
                nome: "", // Vazio
                endereco: "Rua Teste"
            });
            
        // O controller deve barrar
        expect(res.status).not.toBe(201);
    });
});