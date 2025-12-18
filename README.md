# 🗺️ Visse? — Mapa Colaborativo da Cultura Recifense

## 📌 Descrição do Projeto
O *"Visse?"* é um projeto colaborativo, que tem como objetivo divulgar, valorizar e tornar conhecidos os lugares que representam a cultura de Recife, especialmente aqueles que não são amplamente divulgados ou conhecidos pela maioria dos frequentadores da cidade.

A proposta geral é construir um **mapa interativo e colaborativo**, em que os próprios usuários possam contribuir com locais, descrições, histórias e percepções, formando uma visão plural da **identidade cultural recifense**. Esses locais podem ser museus, pontos históricos, bares tradicionais, manifestações artísticas ou até locais de natureza que carreguem valor cultural.

O projeto também utiliza gamificação, incentivando a participação ativa dos usuários por meio do **acúmulo de pontos**, que podem ser convertidos em **moedas Capiba**, integradas ao ecossistema do **Conecta Recife**.

---

## 🚀 Como Funciona
Usuários podem cadastrar novos locais culturais no mapa. Cada local possui nome, imagem e descrição, explicando sua relevância cultural. Um mesmo local pode ter múltiplas descrições, escritas por diferentes usuários, reunindo diferentes vivências e histórias. Todas as interações geram pontos, armazenados no perfil do usuário.

## ✨ Funcionalidades
- **Login Seguro**: Autenticação integrada ao Conecta Recife;
- **Cadastro de Locais**: Usuário pode cadastrar novos pontos culturais com nome, imagem e descrição. Cada cadastro gera pontos;
- **Descrições Múltiplas**: Usuário pode adicionar novas descrições em locais já existentes;
- **Interação Social**: Usuário pode curtir descrições de outros usuários;
- **Favoritar Locais**: Usuário pode favoritar locais para acessá-los facilmente depois;
- **Exploração no Mapa**: Visualização de todos os locais em um mapa interativo, com marcadores;
- **Perfil do Usuário**: Visualização das contribuições realizadas e acompanhamento de pontos acumulados;
- **Gamificação e Recompensas**: Conversão de pontos em moedas Capiba.

---

## 👥 Membros da Equipe 
<table> 
  <tr> 
    <td align="center"> 
      <a href="https://github.com/analauraboliveira"> 
        <img src="https://avatars.githubusercontent.com/u/207280291?v=4" width="115"><br> 
        <sub><b>Ana Laura Barboza</b></sub><br> <sub>(<code>analauraboliveira</code>)</sub> 
      </a> 
    </td> 
    <td align="center"> 
      <a href="https://github.com/Edo-Alve5"> 
        <img src="https://avatars.githubusercontent.com/u/239075849?v=4" width="115"><br> 
        <sub><b>Eduardo Alves</b></sub><br> <sub>(<code>Edo-Alve5</code>)</sub> 
      </a> 
    </td> 
    <td align="center"> 
      <a href="https://github.com/lestrb"> 
        <img src="https://avatars.githubusercontent.com/u/193823503?v=4" width="115"><br> 
        <sub><b>Letícia Staudinger</b></sub><br> <sub>(<code>lestrb</code>)</sub> 
      </a> 
    </td> 
     <td align="center"> 
      <a href="https://github.com/claramtenorio"> 
        <img src="https://avatars.githubusercontent.com/u/158226328?v=4" width="115"><br> 
        <sub><b>Maria Clara Laranjeira</b></sub><br> <sub>(<code>safiracode</code>)</sub> 
      </a> 
    </td> 
    <td align="center"> 
      <a href="https://github.com/reilsonbatista-design"> 
        <img src="https://avatars.githubusercontent.com/u/225021265?v=4" width="115"><br> 
        <sub><b>Reilson Batista</b></sub><br> <sub>(<code>safiracode</code>)</sub> 
      </a> 
    </td> 
     <td align="center"> 
      <a href="https://github.com/safiracode"> 
        <img src="https://avatars.githubusercontent.com/u/206463303?v=4" width="115"><br> 
        <sub><b>Safira Moraes</b></sub><br> <sub>(<code>safiracode</code>)</sub> 
      </a> 
    </td> 
     <td align="center"> 
      <a href="https://github.com/VitoriaDasDores"> 
        <img src="https://avatars.githubusercontent.com/u/91498762?v=4" width="115"><br> 
        <sub><b>Vitória das Dores</b></sub><br> <sub>(<code>safiracode</code>)</sub> 
      </a> 
    </td> 
  </tr> 
</table> 

---

## 🛠️ Ferramentas, frameworks e bibliotecas utilizados 
Para o desenvolvimento do Projeto _Visse?_, utilizamos um conjunto de ferramentas e tecnologias, que tornaram possível criar um projeto tecnicamente funcional. Esses recursos foram:

- **JavaScript**: Linguagem principal do projeto, utilizada na implementação da lógica da aplicação, organização dos módulos e integração entre frontend e backend;
- **Frontend (React.js)**: Biblioteca utilizada para a construção da interface do usuário de forma componentizada e reativa;
- **Backend (Node.js + Express)**: Ambiente e framework responsáveis pela criação da API, definição das rotas e implementação das regras de negócio;
- **Banco de Dados (MongoDB)**: Banco de dados NoSQL utilizado para o armazenamento e gerenciamento das informações da aplicação;
- **Mapas (API de mapas)**: Serviço externo utilizado para exibição e manipulação de dados geográficos no sistema;
- **Autenticação (Conecta Recife)**: Serviço utilizado para autenticação e validação de usuários na plataforma;
- **Estilização (CSS / Tailwind CSS)**: Tecnologias utilizadas para a estilização da interface, garantindo organização visual e responsividade;
- **Visual Studio Code**: Editor de código adotado pela equipe, com suporte a extensões para depuração, formatação e integração com controle de versão;
- **GitHub**: Plataforma utilizada para versionamento do código, acompanhamento de alterações e colaboração entre os integrantes do projeto;
- **Dockerização (Docker e Docker Compose)**: Ferramentas utilizadas para padronizar o ambiente de desenvolvimento e execução do projeto, permitindo a criação de containers para frontend e backend de forma isolada e reproduzível;
- **Comunicação (Discord e WhatsApp)**: Ferramentas utilizadas para comunicação da equipe, alinhamento de tarefas e realização de reuniões.

## 🔧 Práticas de Refatoração (Refactoring) 
Durante o desenvolvimento do projeto Visse?, foram realizadas atividades de **refatoração** com o objetivo de melhorar a qualidade do código, aumentar a legibilidade, facilitar a manutenção e tornar o sistema mais testável, sem alterar o comportamento externo da aplicação.

A partir da execução dos testes automatizados, foram identificados *bad smells*, como **código duplicado**, **uso de números mágicos**, **métodos excessivamente longos**, **dados hardcoded** e **estilos em linha** no frontend. Para corrigir esses problemas, o código foi reorganizado por meio da **extração de funções**, **criação de constantes nomeadas**, **separação de responsabilidades entre controllers e serviços**, **externalização de configurações** e **melhor organização dos estilos visuais**.

O detalhamento completo dos testes realizados e das refatorações aplicadas encontra-se documentado na pasta Testes e Refactoring, onde estão descritos os cenários testados, as estratégias adotadas e as melhorias implementadas no código. Para fins de resumo, pode-se visualizar a seguinte tabela:

| Teste | Ação | Resultado | Impacto |
|------|------|-----------|---------|
| 1 | Extração de código duplicado para a função `limparArquivoTemporario` | Centralização da lógica de limpeza | Código mais limpo e fácil de manter |
| 2 | Substituição de números mágicos por constantes nomeadas | Significado explícito dos valores no código | Redução de erros e melhor legibilidade |
| 3 | Decomposição do método `createLocal` em funções menores | Redução da complexidade do método | Código mais modular e testável |
| 4 | Movimentação da lógica de negócio para classes de serviço | Controllers mais simples | Melhor organização da arquitetura |
| 5 | Externalização de dados hardcoded para arquivos JSON | Configurações desacopladas da lógica | Manutenção facilitada |
| 6 | Remoção de estilos inline no frontend | Separação entre lógica e apresentação | Reutilização de CSS e melhor organização visual |


---

## 🧱 Estrutura de Pastas
```
├── .github                            ## Configurações do GitHub (CI/CD e automações)
│   ├── workflows/
│       └── tests.yml                  ## Pipeline de testes automatizados
│
├── Architeture Decision Log/          ## Registro das decisões arquiteturais do projeto (em modelo de ADRs)
│
├── Testes e Refactoring/              ## Registro dos testes realizados e das decisões de Refactoring
│   ├── Frontend.md                    ## Testes do Frontend 
│   └── Backend.md                     ## Testes do Backend
│
├── client/                            ## Frontend da aplicação (React + Tailwind)
│   ├── public/
│   ├── src/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
├── server/                            ## Backend da aplicação (API e regras de negócio)
│   ├── Config/
│   ├── Utils/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── uploads/locais/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── .gitignore
│
├── App.jsx                            ## Arquivo principal do frontend (componente raiz React)
│
├── README.md                          ## Read Me do GitHub do Projeto
│
└── docker-compose.yml                 ## Orquestração dos containers Docker (client + server)
```

---

## 🐳 Dockerização e Ambiente de Desenvolvimento
O projeto Visse? utiliza *Docker* e *Docker Compose* para orquestrar o ambiente de desenvolvimento, garantindo que o sistema funcione de forma idêntica em qualquer máquina, sem a necessidade de instalação manual de dependências globais.

### 🏗️ Arquitetura dos Containers
A aplicação é dividida em dois serviços principais:

1. *Frontend (Client)*: Container Node.js que roda o ambiente React (porta 3000).
2. *Backend (Server)*: Container Node.js (ESM) que roda a API Express (porta 3002).

### ☁️ Persistência de Dados e Nuvem
Diferente de uma configuração padrão, este ambiente Docker está integrado diretamente ao *MongoDB Atlas*:

* *Dados na Nuvem*: Toda a persistência é feita no Atlas, permitindo que os dados sobrevivam mesmo que os containers sejam removidos.
* *Segurança: As credenciais são carregadas via arquivo .env localmente (não versionado) e via **GitHub Secrets* no pipeline de CI.
* *Arquivos Locais*: O upload de imagens via multer é persistido através de um volume Docker na pasta ./server/uploads.

### 🚀 Como Rodar o Projeto com Docker

#### 1. Pré-requisitos

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.
* Arquivo .env configurado dentro da pasta /server com a MONGO_URI do Atlas.

#### 2. Passo a Passo
No terminal, na raiz do projeto, execute o comando abaixo para construir as imagens e subir os containers:

```
bash
docker compose up --build
```

#### 3. Acesso à Aplicação
Após a inicialização, os serviços estarão disponíveis em:

* *Frontend*: http://localhost:3000
* *Backend (API)*: http://localhost:3002

### 🛠️ Comandos Úteis

| Comando | Descrição |
| --- | --- |
| docker compose up | Inicia os containers existentes. |
| docker compose down | Para e remove os containers e redes criadas. |
| docker compose ps | Lista o status dos containers do projeto. |
| docker compose logs -f | Acompanha os logs de erro e saída em tempo real. |

### 📝 Observações

* *Hot-Reload*: Os volumes estão mapeados de forma que qualquer alteração no código fonte (/client ou /server) reinicie o serviço automaticamente dentro do container.

---

### 📄 **Licença**
Este projeto é de uso acadêmico e livre para fins educacionais.
