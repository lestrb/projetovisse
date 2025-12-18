# Testes do Frontend

## Descrição

**Sistema:**  
Visse?

**Módulo/Subsistema:**  
Frontend – Interface do Usuário

**Data:**  
Dezembro de 2025

**Breve Descrição:**  
Este documento descreve os testes realizados no frontend da aplicação Visse?, com foco na renderização correta dos componentes e na experiência do usuário. Os testes garantem que os elementos principais da interface estejam visíveis e acessíveis após a renderização inicial.

---

## Arquivos

- client/src/pages/ConversaoCapiba/index.jsx  
- client/src/pages/Login/index.jsx  

---

## Testes Realizados

### 1. Renderização de Interface

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 1 | Renderização da tela de conversão de Capibas | Textos “Capibas” e botão de conversão visíveis | Não |

---

## Refactoring (Refatoração)

Durante os testes de interface, foram identificados problemas de organização visual e manutenção:

- **Estilos em linha:** objetos de estilo CSS definidos diretamente no JSX foram removidos.
- **Separação de responsabilidades:** os estilos foram movidos para arquivos `.css`, permitindo reutilização e melhor legibilidade do código.
  
Essas alterações melhoraram a organização do frontend e facilitaram a evolução dos componentes visuais.
