# Projeto ZettaTask To-Do List API

API RESTful para um sistema de gerenciamento de tarefas (to-do list), permitindo que usuários se cadastrem, autentiquem e gerenciem suas tarefas. Este projeto foi desenvolvido como parte do Desafio II do Zetta Lab 2025.

## Tecnologias Utilizadas

* [cite_start]**Backend:** Node.js [cite: 1, 9]
* [cite_start]**Framework:** Express [cite: 1, 9]
* [cite_start]**Banco de Dados:** PostgreSQL [cite: 1, 10]
* **ORM:** Sequelize
* [cite_start]**Autenticação:** JSON Web Token (JWT) [cite: 2, 11]
* [cite_start]**Containerização:** Docker [cite: 1, 12]

## [cite_start]Modelo de Entidade e Relacionamento (ERD) [cite: 14]

O sistema possui duas entidades principais: `Usuario` e `Tarefa`.

* **Usuario**: Armazena os dados dos usuários.
    * `id` (Chave Primária)
    * `nome`
    * `email`
    * `senha` (armazenada com hash)
* **Tarefa**: Armazena as tarefas criadas.
    * `id` (Chave Primária)
    * `nome`
    * `descricao`
    * `status`
    * `UsuarioId` (Chave Estrangeira para `Usuario`)

**Relacionamento:** Um `Usuario` pode ter várias (`N`) `Tarefas`, mas uma `Tarefa` pertence a apenas um (`1`) `Usuario`. (Relacionamento 1:N)

## Como Executar o Projeto

1.  **Clone o repositório.**
2.  **Inicie o banco de dados com Docker:**
    ```bash
    docker-compose up -d
    ```
3.  **Navegue até a pasta do backend:**
    ```bash
    cd backend
    ```
4.  **Instale as dependências:**
    ```bash
    npm install
    ```
5.  **Execute as migrations do banco de dados:**
    ```bash
    npx sequelize-cli db:migrate
    ```
6.  **Inicie o servidor:**
    ```bash
    node index.js
    ```
O servidor estará rodando em `http://localhost:3001`.

## Documentação da API

### Módulo de Autenticação

#### 1. Cadastrar um novo usuário
* **Método:** `POST`
* **Endpoint:** `/users/register`
* **Corpo da Requisição (JSON):**
    ```json
    {
        "nome": "Seu Nome",
        "email": "email@exemplo.com",
        "senha": "sua_senha"
    }
    ```
* **Resposta de Sucesso (201 Created):**
    ```json
    {
        "message": "Usuário cadastrado com sucesso!",
        "usuario": {
            "id": 1,
            "nome": "Seu Nome",
            "email": "email@exemplo.com"
        }
    }
    ```

#### 2. Autenticar um usuário
* **Método:** `POST`
* **Endpoint:** `/users/login`
* **Corpo da Requisição (JSON):**
    ```json
    {
        "email": "email@exemplo.com",
        "senha": "sua_senha"
    }
    ```
* **Resposta de Sucesso (200 OK):**
    ```json
    {
        "message": "Login realizado com sucesso!",
        "token": "seu_token_jwt_aqui"
    }
    ```

### Módulo de Tarefas

**Atenção:** Todas as rotas de tarefas são protegidas e exigem um token de autenticação. Envie o token no cabeçalho `Authorization` como `Bearer seu_token_jwt_aqui`.

#### 1. Criar uma nova tarefa
* **Método:** `POST`
* **Endpoint:** `/tasks`
* **Corpo da Requisição (JSON):**
    ```json
    {
        "nome": "Nome da Tarefa",
        "descricao": "Descrição detalhada da tarefa."
    }
    ```
* **Resposta de Sucesso (201 Created):** Retorna o objeto da tarefa criada.

#### 2. Listar tarefas do usuário
* **Método:** `GET`
* **Endpoint:** `/tasks`
* [cite_start]**Filtro (Opcional):** Você pode filtrar por status adicionando `?status=pendente` ou `?status=concluída` ao final da URL. [cite: 2, 7]
* **Resposta de Sucesso (200 OK):** Retorna um array com as tarefas do usuário.

#### 3. Atualizar uma tarefa
* **Método:** `PUT`
* **Endpoint:** `/tasks/:id` (substitua `:id` pelo ID da tarefa)
* **Corpo da Requisição (JSON):**
    ```json
    {
        "nome": "Novo Nome da Tarefa",
        "descricao": "Nova descrição da tarefa.",
        "status": "concluída"
    }
    ```
* **Resposta de Sucesso (200 OK):** Retorna o objeto da tarefa atualizada.

#### 4. Excluir uma tarefa
* **Método:** `DELETE`
* **Endpoint:** `/tasks/:id` (substitua `:id` pelo ID da tarefa)
* **Resposta de Sucesso (204 No Content):** Resposta sem corpo, indicando sucesso.