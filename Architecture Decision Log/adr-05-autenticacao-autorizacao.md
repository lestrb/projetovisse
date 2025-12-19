# ADR 05 — Mecanismo de autenticação e autorização

**Status:** Aceito  
**Autores:** Time Visse?

## Contexto
A aplicação requer um sistema seguro para restringir o cadastro de locais apenas a usuários logados. O sistema deve ser Stateless para facilitar a manutenção.

## Decisão
Usar JWT (JSON Web Token) para autenticação, integrado aos tokens da API Capiba. O token é armazenado no LocalStorage e enviado via Header de autorização nas requisições.

## Consequências
- Implementação leve, compatível com qualquer frontend.  
- Permite validação rápida do usuário no Backend (via middleware) sem consultar o banco a todo momento.