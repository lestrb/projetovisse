# Testes do Backend

## Descrição

**Sistema:**  
Visse?

**Módulo/Subsistema:**  
Backend – Serviços, Controllers e API REST

**Data:**  
Dezembro de 2025

**Breve Descrição:**  
Este documento descreve os testes automatizados realizados no backend do sistema Visse?. Os testes validam regras de negócio, integração com serviços externos, segurança das rotas e tratamento de erros. Foram contemplados testes de lógica interna, integração com APIs externas e validação de respostas HTTP.

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

### 3. Lógica de Anti-duplicidade de Locais

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Inserção de coordenadas muito próximas | Retorno `true` (local duplicado) | Não |
| 1 | Inserção de coordenadas distantes | Retorno `false` (local novo) | Não |

---

### 4. Conversão de Pontos

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Conversão de 1250 pontos | Resultado: 2 unidades e resto 250 | Não |

---

### 5. Segurança e Validação da API

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Requisição GET para `/test` | Status 200 OK | Não |
| 1 | POST sem token JWT | Requisição bloqueada | Não |
| 2 | Envio de JSON inválido | Status 400 Bad Request | Não |

---

## Refactoring (Refatoração)

Durante a execução dos testes, foram identificados e corrigidos diversos *bad smells* no código:

- **Código duplicado:** blocos repetidos de exclusão de arquivos temporários foram extraídos para a função `limparArquivoTemporario`, reduzindo redundância.
- **Números mágicos:** valores como `0.001` (distância mínima) e `500` (taxa de conversão) foram substituídos por constantes nomeadas.
- **Método longo / classe inchada:** a função `createLocal` foi decomposta em funções menores e parte da lógica foi movida para serviços especializados.
- **Dados hardcoded:** listas fixas de strings foram extraídas para arquivos JSON externos, facilitando manutenção.
  
Essas refatorações aumentaram a legibilidade, manutenibilidade e testabilidade do backend.
