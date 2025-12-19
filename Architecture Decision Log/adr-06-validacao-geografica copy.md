# ADR 05 — Estratégia de validação geográfica

**Status:** Aceito  
**Autores:** Time Visse?

## Contexto
Para evitar fraudes no sistema de pontos, o sistema precisa garantir que o usuário realmente visitou o local cultural para validar o check-in.

## Decisão
Implementamos a Fórmula de Haversine no backend para calcular a distância esférica entre as coordenadas do usuário e do local, permitindo a validação apenas dentro de um raio de 200 metros.

## Consequências
- Garante a integridade da gamificação e impede que usuários "farmem" pontos de forma remota.