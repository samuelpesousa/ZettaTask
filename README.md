# ZettaTask - Gerenciador de Tarefas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Aplicação Full-Stack de um sistema de gerenciamento de tarefas ("to-do list"), desenvolvida como solução para o **Desafio II - Desenvolvimento de Software** do Zetta Lab 2025.

O projeto consiste em uma API RESTful construída em Node.js para o backend e uma interface interativa em React para o frontend, com todo o ambiente de backend sendo executado em contêineres Docker.

## Funcionalidades Implementadas

* ✅ **Autenticação de Usuários**: Sistema completo de cadastro e login com tokens JWT.
* ✅ **Gerenciamento de Tarefas (CRUD)**: Usuários autenticados podem criar, listar, atualizar e excluir suas próprias tarefas.
* ✅ **Filtro de Tarefas**: A listagem de tarefas permite a filtragem por status (`pendente` ou `concluída`).
* ✅ **Rotas Protegidas**: As rotas de tarefas são protegidas por um middleware de autenticação, garantindo que um usuário não possa acessar ou modificar as tarefas de outro.
* ✅ **Interface Reativa**: O frontend, construído em React, reflete todas as alterações em tempo real, sem a necessidade de recarregar a página.
* ✅ **Ambiente Dockerizado**: A API e o banco de dados rodam em contêineres Docker, garantindo um ambiente de execução consistente e de fácil configuração.

## Stack de Tecnologias

#### **Backend**
* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web para a construção da API RESTful.
* **PostgreSQL**: Banco de dados relacional para persistência de dados.
* **Sequelize**: ORM para a interação com o banco de dados.
* **JSON Web Token (JWT)**: Para a geração de tokens de autenticação.
* **Bcrypt.js**: Para a criptografia de senhas.
* **CORS**: Para permitir a comunicação entre o frontend e o backend.

#### **Frontend**
* **React**: Biblioteca para a construção da interface de usuário.
* **Vite**: Ferramenta de build e servidor de desenvolvimento.
* **React Router DOM**: Para o gerenciamento de rotas e navegação.
* **Axios**: Cliente HTTP para a comunicação com a API.
* **CSS Modules**: Para a estilização dos componentes.

#### **Infraestrutura**
* **Docker & Docker Compose**: Para a containerização e orquestração do ambiente de backend.
* **Git & GitHub**: Para o versionamento e hospedagem do código-fonte.

## Como Executar o Projeto

**Pré-requisitos:**
* Node.js (v18 ou superior)
* NPM
* Docker
* Docker Compose
* Git

**Passo a passo:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Inicie o Backend e o Banco de Dados com Docker:**
    Este comando irá construir a imagem da API e iniciar os contêineres.
    ```bash
    docker-compose up --build
    ```

3.  **Execute as Migrations do Banco de Dados:**
    Com o ambiente rodando, abra **um novo terminal** e execute o comando abaixo para criar as tabelas no banco de dados.
    ```bash
    docker-compose exec api npx sequelize-cli db:migrate
    ```

4.  **Inicie o Frontend:**
    No mesmo novo terminal, navegue até a pasta do frontend, instale as dependências e inicie o servidor de desenvolvimento.
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

5.  **Acesse a Aplicação:**
    Abra seu navegador e acesse [`http://localhost:5173`](http://localhost:5173) (ou a porta indicada pelo Vite).

## Documentação da API

Todas as rotas de tarefas (`/tasks`) são protegidas e exigem um token de autenticação no cabeçalho `Authorization: Bearer <seu_token>`.

### Módulo de Autenticação

#### `POST /users/register`
* **Descrição**: Cadastra um novo usuário.
* **Corpo (Body)**:
    ```json
    { "nome": "string", "email": "string", "senha": "string" }
    ```
* **Resposta (201 Created)**: Objeto com `message` e dados do `usuario` (sem a senha).

#### `POST /users/login`
* **Descrição**: Autentica um usuário existente.
* **Corpo (Body)**:
    ```json
    { "email": "string", "senha": "string" }
    ```
* **Resposta (200 OK)**: Objeto com `message` e o `token` JWT.

### Módulo de Tarefas

#### `POST /tasks`
* **Descrição**: Cria uma nova tarefa para o usuário autenticado.
* **Corpo (Body)**:
    ```json
    { "nome": "string", "descricao": "string" }
    ```
* **Resposta (201 Created)**: Objeto da tarefa recém-criada.

#### `GET /tasks`
* **Descrição**: Lista todas as tarefas do usuário autenticado.
* **Filtro (Query Param)**: `?status=pendente` ou `?status=concluída` para filtrar a lista.
* **Resposta (200 OK)**: Um array de objetos de tarefa.

#### `PUT /tasks/:id`
* **Descrição**: Atualiza uma tarefa existente do usuário.
* **Corpo (Body)**:
    ```json
    { "nome": "string", "descricao": "string", "status": "string" }
    ```
* **Resposta (200 OK)**: Objeto da tarefa atualizada.

#### `DELETE /tasks/:id`
* **Descrição**: Exclui uma tarefa existente do usuário.
* **Resposta (204 No Content)**: Resposta vazia indicando sucesso.

---
*Desenvolvido por [Samuel Sousa]*
