# ADR 02 — Estratégia de banco de dados

**Status:** Aceito  
**Autores:** Time Visse?

## Contexto
A aplicação precisa armazenar dados de locais, usuário e gamificação. Precisamos de uma solução que evite a complexidade de manter servidores de bancos de dados locais e garanta acesso remoto para todos os desenvolvedores.

## Decisão
Utilizar o MongoDB Atlas (Cloud) como banco de dados principal, conectado via string de conexão segura no arquivo .env.

## Consequências
- Elimina a necessidade de instalação local do MongoDB para rodar o projeto (considerando o fato de sermos novos devs).  
- Garante backups automáticos e alta disponibilidade gerenciada pelo provedor.