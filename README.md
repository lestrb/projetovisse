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
        <img src="https://media-for2-1.cdn.whatsapp.net/v/t61.24694-24/484208345_1875642679850162_6002395139070660778_n.jpg?ccb=11-4&oh=01_Q5Aa2wFiCpbyM5sNUZfNnsWtJWS89EvNuel8qniWy9wQoe5qpg&oe=691789A2&_nc_sid=5e03e0&_nc_cat=100" width="115"><br> 
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
- **JavaScript** — Linguagem principal do projeto, utilizada para a implementação da lógica, organização das classes e integração do sistema;
- **Frontend**: React.js;
- **Backend**: Node.js + Express;
- **Banco de Dados**: MongoDB;
- **Mapas**: API de mapas;
- **Autenticação**: Conecta Recife;
- **Estilização**: CSS;
- **nlohmann/json** — Biblioteca usada para realizar a persistência de dados em formato JSON, permitindo salvar e recuperar informações sem um banco de dados real;
- **Visual Studio Code** — Editor de código adotado pela equipe, com extensões para depuração e integração com o GitHub;
- **GitHub** — Usado para o controle de versão, acompanhamento das alterações e colaboração remota de forma organizada; 
- **Discord e WhatsApp** — Aplicativos de comunicação, utilizados para o alinhamento de equipe, com mensagens e reuniões por chamada de vídeo;
- **Makefile** — Usado para automatizar o processo de compilação e limpeza dos arquivos gerados.

---

## 🧱 Estrutura de Pastas
```
├── .vscode/
│   ├── settings.json
│   └── tasks.json
│
├── classes/
│   ├── ComparadorPaciente.h
│   ├── Consulta.h
│   ├── FilaAtendimento.h
│   ├── Hospital.h
│   ├── Medico.h
│   ├── Paciente.h
│   ├── Pessoa.h
│   └── Relatorios.h
│
├── docs/   
│   ├── imagens/
│       └── agendamento.png
│       └── cadastro_medico.png
│       └── cadastro_paciente.png
│       └── fila.png
│       └── lista_pacientes.png
│       └── menu_principal.png
│       └── submenu_consultas.png
│       └── submenu_medicos.png
│       └── submenu_pacientes.png
│       └── submenu_relatorios.png
│   └── index.html
│
├── include/
│   └── nlohmann/
│       └── json.hpp
│
├── src/
│   ├── Consulta.cpp
│   ├── FilaAtendimento.cpp
│   ├── Hospital.cpp
│   ├── main.cpp
│   ├── Medico.cpp
│   ├── Paciente.cpp
│   ├── Pessoa.cpp
│   └── Relatorios.cpp 
│
├── .gitignore
│
├── Makefile
│
└── README.md

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
