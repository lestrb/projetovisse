# Testes do Backend

## Descrição

**Sistema:** Visse?

**Módulo/Subsistema:** Backend – Serviços, Controllers e API REST

**Data:** Dezembro de 2025

**Breve Descrição:** Este documento descreve os testes automatizados realizados no backend do sistema Visse?. Os testes validam regras de negócio, integração com serviços externos, segurança das rotas e tratamento de erros. Foram contemplados testes de lógica interna (Caixa Branca), integração com APIs externas e validação de respostas HTTP.

---

## Arquivos

**Services:**
- server/services/geocodingService.js
- server/services/localService.js

**Controllers:**
- server/controllers/LocalController.js
- server/controllers/pontuacaoController.js
- server/controllers/comentarioController.js

**Routes:**
- server/routes/LocalRoute.js
- server/routes/TestRoute.js

**Tests:**
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
| 0 | Cálculo de distância para o mesmo ponto (0m) | Distância próxima de 0 (erro flutuante aceito) | Não |
| 1 | Cálculo de distância dentro do raio (ex: 150m) | Distância < 200m (Aprovado) | Não |
| 2 | Cálculo de distância fora do raio (ex: Recife -> Olinda) | Distância > 200m (Rejeitado) | Não |

---

### 5. Validação de Histórico Único / Anti-Farming (Caixa Branca)
*Validação da regra que impede ganhar pontos repetidos no mesmo local.*

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Usuário tenta check-in em local já existente no histórico com ação `VISITAR_LOCAL` | Retorno `true` (Bloqueado/Já visitou) | Não |
| 1 | Usuário tenta check-in em local inédito | Retorno `false` (Permitido/Novo ponto) | Não |
| 2 | Histórico vazio | Retorno `false` (Permitido) | Não |

---

### 6. Conversão de Pontos (Caixa Branca)
*Validação da taxa de conversão (0.5) e arredondamento.*

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Conversão de 100 pontos Visse | Resultado: 50 Capibas (Taxa 0.5) | Não |
| 1 | Conversão de número ímpar (15 pontos) | Resultado: 7 Capibas (Arredondamento `floor`) | Não |
| 2 | Tentativa de converter abaixo do mínimo (5 pontos) | Retorno `false` ou bloqueio | Não |

---

### 7. Regra de Pontuação em Desafios (Caixa Branca)
*Validação da lógica híbrida (Visse + API Externa): Usuário completa desafio mas não deve "farmar" pontos Visse se já visitou o local.*

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Check-in de desafio em local inédito (nunca visitado) | Pontos Visse concedidos (10) | Não |
| 1 | Check-in de desafio em local já visitado anteriormente | Desafio validado (Sucesso), mas 0 pontos Visse | Não |

---

### 8. Validação de Conteúdo - Comentários (Caixa Branca)
*Validação de limites de caracteres e preenchimento.*

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Comentário curto ("Oi") | Rejeitado ("Muito curto") | Não |
| 1 | Comentário vazio ou apenas espaços | Rejeitado ("Muito curto") | Não |
| 2 | Comentário válido ("Lugar excelente...") | Aceito ("Válido") | Não |
| 3 | Comentário gigante (acima de 500 caracteres) | Rejeitado ("Muito longo") | Não |

---

### 9. Tratamento de Erro de Geocoding (Caixa Branca)
*Simulação de resposta vazia da API de mapas.*

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | API externa retorna lista vazia (endereço não encontrado) | Erro 400 lançado com mensagem "Endereço não localizado" | Não |

---

### 10. Segurança e Validação da API (Caixa Preta)

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Requisição GET para `/test` (Health Check) | Status 200 OK | Não |
| 1 | POST para `/locais` sem token JWT | Status diferente de 200/201 (Bloqueado) | Não |
| 2 | POST para `/locais` com token falso e dados vazios | Status diferente de 201 (Bloqueado por validação) | Não |

---

## Refactoring (Refatoração)

Durante a execução dos testes, foram identificados e corrigidos diversos *bad smells* no código:

- **Código duplicado:** blocos repetidos de exclusão de arquivos temporários foram extraídos para a função `limparArquivoTemporario`, reduzindo redundância.
- **Números mágicos:** valores como `0.001` (distância mínima) e `500` (taxa de conversão) foram substituídos por constantes nomeadas.
- **Método longo / classe inchada:** a função `createLocal` foi decomposta em funções menores e parte da lógica foi movida para serviços especializados.
- **Dados hardcoded:** listas fixas de strings foram extraídas para arquivos JSON externos, facilitando manutenção.
  
Essas refatorações aumentaram a legibilidade, manutenibilidade e testabilidade do backend.
