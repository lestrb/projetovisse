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
---

## 🧱 Estrutura de Pastas
```
├── .github                           ## Configurações do GitHub (CI/CD e automações)
│   ├── workflows/
│       └── tests.yml                 ## Pipeline de testes automatizados
│
├── Architeture Decision Log/         ## Registro das decisões arquiteturais do projeto (em modelo de ADRs)
│
├── client/                           ## Frontend da aplicação (React + Tailwind)
│   ├── public/
│   ├── src/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
├── server/                           ## Backend da aplicação (API e regras de negócio)
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

## ⚙️ Como Compilar e Executar

### 🔹 Pré-requisitos
- **Compilador C++17** ou superior (`g++`, `clang++`, etc.)
- **Make** ou **MinGW Make**
- **Biblioteca nlohmann/json** (já incluída na pasta `include/nlohmann/json.hpp`)

---
  
### 🪟 **Windows (PowerShell ou CMD)**
1. Abra o terminal na raiz do projeto.
2. Para compilar:
   ```powershell
   mingw32-make
3. Para limpar e recompilar do zero:
   ```powershell
   mingw32-make rebuild
4. Após a compilação, o executável será gerado na pasta:
   ```powershell
   bin/hospital.exe
5. Para executar:
   ```powershell
   bin/hospital.exe

---

### 🐧 **Linux / macOS (Bash ou Terminal)**
1. Abra o terminal na raiz do projeto.
2. Para compilar:
   ```bash
   make
3. Para limpar e recompilar do zero:
   ```bash
   make rebuild
4. Após a compilação, o executável será gerado na pasta:
   ```bash
   bin/hospital
5. Para executar:
   ```bash
   ./bin/hospital
   
---

### 📄 **Licença**
Este projeto é de uso acadêmico e livre para fins educacionais.
