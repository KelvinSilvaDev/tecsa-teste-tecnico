# Gerenciamento de Tarefas - Fullstack Application

## Descrição
Aplicação para gerenciamento de tarefas utilizando PHP, MySQL, HTML, CSS, JavaScript e Bootstrap. A aplicação é executada em ambiente Docker e oferece funcionalidades de criação, listagem, atualização e exclusão de tarefas via API RESTful.

## Estrutura do Projeto
project/
├── backend/
│   ├── config.php
│   └── api/
│       ├── index.php
│       └── .htaccess
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
├── Dockerfile
├── docker-compose.yml
└── README.md

## Como Executar
1. Clone o repositório.
2. Inicie o ambiente Docker:

docker-compose up --build

3. Acesse a aplicação pelo navegador em: [http://localhost:9000/frontend/index.html](http://localhost:9000/frontend/index.html)

## Banco de Dados
O banco de dados MySQL é iniciado com o nome `task_db` e a tabela `tasks` deve ser criada conforme o exemplo no script SQL.

## Testes e Extras
- Testes unitários para o backend podem ser implementados utilizando PHPUnit.
- Extras opcionais: autenticação via JWT, validação e sanitização de dados, organização do código JavaScript com módulos ES6.
