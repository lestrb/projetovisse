# ADR 04 — Infra & Deploy: Coolify + Docker + GitHub

**Status:** Aceito  
**Data:** 2025-10-20  
**Autores:** Time Visse?

## Contexto
Queremos deploy previsível, rollback simples e workflow integrado com GitHub. Também precisamos que o ambiente de desenvolvimento local reflita a infra para facilitar debugging.

## Decisão
- Containerizar backend e frontend com Docker (multi-stage builds).  
- Usar **Coolify** para orquestrar builds/deploys a partir do **GitHub**.  
- Armazenar segredos no Coolify (`MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_*`).

## Consequências
- Deploys mais previsíveis; builds padronizados.  
- Necessidade de otimizar Dockerfiles para reduzir tamanho/tempo de build.  
- Documentar comandos de dev e CI (`npm run dev`, `build`, etc.).  
- Preparar health checks e estratégia de rollback no Coolify.