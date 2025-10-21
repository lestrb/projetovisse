# ADR 03 — MongoDB: serviço gerenciado (Atlas) vs self-hosted

**Status:** Aceito (provisório)  
**Data:** 2025-10-20  
**Autores:** Time Visse?

## Contexto
Decidir entre rodar MongoDB em container próprio (self-hosted) ou usar um serviço gerenciado (MongoDB Atlas). Considerações: backups, monitoramento, carga operacional.

## Decisão
Para produção, usar **MongoDB Atlas (serviço gerenciado)**.  

## Consequências
- Fácil de configurar e acessar de qualquer lugar.  
- Backups automáticos e painel web para gerenciamento.  
- Menos overhead operacional para equipe pequena.
 
