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
**Páginas:**
- client/src/pages/ConversaoCapiba/ConversaoCapibaScreen.jsx  
- client/src/pages/Login/index.jsx  
- client/src/pages/Feed/PaginaInicial.jsx  
- client/src/pages/MapScreen/index.jsx  
- client/src/pages/Descricao Local/DetalhesLocalScreen.jsx  
- client/src/pages/Favorites/FavoriteScreen.jsx  
- client/src/pages/Formulario/FormularioCadastroLocal.jsx  
- client/src/pages/Profile/ProfileScreen.jsx  
- client/src/pages/Profile/VisitedScreen.jsx  

**Componentes:**
- client/src/components/Header.jsx  
- client/src/components/Footer.jsx  
- client/src/components/Map/LeafletMap.jsx  
- client/src/components/Map/LeafletMarkers.jsx  

---


## Testes Realizados

### 1. Renderização de Interface

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 1 | Renderização da tela de conversão de Capibas | Textos “Capibas” e botão de conversão visíveis | Não |
| 2 | Renderização da tela de Login | Campos de email, senha e botão de login visíveis | Não |
| 3 | Renderização da Página Inicial (Feed) | Lista de locais carregada e elementos visuais exibidos | Não |
| 4 | Renderização do Mapa Interativo | Mapa Leaflet carregado com marcadores visíveis | Não |
| 5 | Renderização da tela de Detalhes do Local | Informações do local exibidas corretamente | Não |
| 6 | Renderização da tela de Favoritos | Lista de locais favoritados exibida | Não |
| 7 | Renderização do formulário de cadastro de local | Campos de formulário e botão de envio visíveis | Não |
| 8 | Renderização do Perfil do Usuário | Dados do perfil exibidos corretamente | Não |
| 9 | Renderização da tela de Locais Visitados | Histórico de locais visitados exibido | Não |


---

### 2. Navegação Entre Telas (Caixa Preta)

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Navegação do Login para a Página Inicial | Usuário redirecionado corretamente | Não |
| 1 | Navegação do Feed para Detalhes do Local | Página de detalhes carregada | Não |
| 2 | Navegação para tela de Perfil | Tela de perfil exibida sem erros | Não |
| 3 | Navegação para Favoritos | Lista de favoritos exibida | Não |

---

### 3. Validação Visual de Componentes

| Teste | Ação | Resultado Esperado | Falha |
|------|------|-------------------|-------|
| 0 | Renderização do Header | Header visível em todas as páginas principais | Não |
| 1 | Renderização do Footer | Footer exibido corretamente | Não |
| 2 | Renderização dos marcadores no mapa | Marcadores posicionados corretamente | Não |

---

## Refactoring (Refatoração)

Durante os testes de interface, foram identificados problemas de organização visual e manutenção:

- **Estilos em linha:** objetos de estilo CSS definidos diretamente no JSX foram removidos.
- **Separação de responsabilidades:** os estilos foram movidos para arquivos `.css`, permitindo reutilização e melhor legibilidade do código.
  
Essas alterações melhoraram a organização do frontend e facilitaram a evolução dos componentes visuais.
