# Testes do Backend

## Descrição

**Sistema:** Visse?

**Módulo/Subsistema:** Backend – Serviços, Controllers e API REST

**Data:** Dezembro de 2025

**Breve Descrição:** Este documento descreve os testes automatizados realizados no backend do sistema Visse?. Os testes validam regras de negócio, integração com serviços externos, segurança das rotas e tratamento de erros. Foram contemplados testes de lógica interna (Caixa Branca), integração com APIs externas e validação de respostas HTTP.

---

## Arquivos

- server/services/geocodingService.js  
- server/controllers/LocalController.js  
- server/controllers/pontuacaoController.js  
- server/tests/regrasNegocio.test.js  
- server/tests/api.spec.js  
- server/tests/testEnderecosEspecificos.js  

---

## Testes Realizados

### 1. Integração com Serviço de Geocoding

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Envio de endereço real para a função `geocodeAddress` | Retorno com latitude e longitude numéricas | Não |
| 1 | Simulação de falha de rede | Execução correta do bloco `catch` | Não |

---

### 2. Validação de Endereços Genéricos

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Inserção de endereço completo | Endereço aceito e fluxo segue | Não |
| 1 | Inserção de endereço genérico (“Brasil”, “Recife”) | Exceção lançada e fluxo interrompido | Não |

---

### 3. Lógica de Anti-duplicidade de Locais (Caixa Branca)
*Validação da constante `RAIO_BUSCA_COORD` (0.001 graus).*

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Inserção de coordenada idêntica (Duplicata exata) | Retorno `true` (Bloqueado) | Não |
| 1 | Inserção de coordenada dentro do delta 0.001 (Vizinho) | Retorno `true` (Bloqueado) | Não |
| 2 | Inserção de coordenada fora do delta (Distante) | Retorno `false` (Permitido) | Não |

---

### 4. Lógica de Distância GPS - Haversine (Caixa Branca)
*Validação da fórmula matemática para o Check-in (Raio de 200m).*

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Cálculo de distância para o mesmo ponto (0m) |
