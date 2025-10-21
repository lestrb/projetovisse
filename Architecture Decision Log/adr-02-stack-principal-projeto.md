# ADR 02 — Stack principal do projeto

**Status:** Aceito  
**Data:** 2025-10-20  
**Autores:** Time Visse?

## Contexto
O projeto "Visse?" precisa de um stack que permita desenvolvimento agil. As decisões de infraestrutura e escolhas técnicas devem favorecer rapidez e manutenção para um time pequeno.

## Decisão
Manter o stack já definido:
- **Backend:** Node.js + Express.js  
- **Frontend:** Next.js + TailwindCSS + Material UI  
- **Database:** MongoDB
- **Repo:** GitHub

## Consequências
- Desenvolvimento rápido e boa compatibilidade entre camadas.  
- MongoDB dá flexibilidade para dados de pontos de interesse/descrições.  
- Integração simples entre as partes (utilizando MERN).
