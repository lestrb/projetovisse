# ADR 05 — Autenticação e autorização

**Status:** Aceito  
**Data:** 2025-10-21  
**Autores:** Time Visse?

## Contexto
A aplicação precisa de autenticação para usuários que vão cadastrar locais, curtir e ganhar pontos.  
Queremos um sistema seguro e simples de manter.

## Decisão
- Usar **JWT** (JSON Web Token) para autenticação.  
- Armazenar o token em **cookies HttpOnly** (melhor segurança contra XSS).  
- Ter endpoints no backend para login, logout e refresh do token.  
- Roles simples no payload: `user`, `admin`, etc.  

## Consequências
- Implementação leve, compatível com qualquer frontend.  
- Tokens não acessíveis por JavaScript (mais seguro).  
- Precisa de cuidados com expiração e renovação dos tokens.