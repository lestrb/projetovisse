# ADR 01 — Definição da stack de Backend e de Frontend

**Status:** Aceito  
**Autores:** Time Visse?

## Contexto
O projeto requer um ambiente de desenvolvimento ágil. Precisamos de uma separação clara entre interface e lógica para permitir o trabalho paralelo do time, usando uma linguagem unificada (JavaScript).

## Decisão
No Backend utilizamos Node.js com o framework Express.js e no Frontend utilizamos React.js padrão, com comunicação via API REST. Além disso, escolhemos MongoDB para o banco de dados.

## Consequências
- Desenvolvimento rápido devido ao vasto ecossistema de JavaScript.  
- O uso de React puro simplifica a hospedagem estática do frontend e desacopla completamente a interface da API. 