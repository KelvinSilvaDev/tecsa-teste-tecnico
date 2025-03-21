# Gerenciador de Tarefas

Um sistema completo de gerenciamento de tarefas desenvolvido com PHP no backend e HTML/CSS/JavaScript (Vanilla) no frontend, utilizando Docker para fácil implantação.

## Descrição do Projeto

Este projeto consiste em uma aplicação web para gerenciamento de tarefas, com funcionalidades de criação, leitura, atualização e exclusão (CRUD). O sistema permite:

- Criar novas tarefas com título, descrição e status
- Visualizar todas as tarefas em uma interface responsiva
- Atualizar informações e status das tarefas
- Excluir tarefas existentes

### Tecnologias Utilizadas

**Backend:**
- PHP 8.2
- MySQL para persistência de dados
- API RESTful

**Frontend:**
- HTML5, CSS3
- JavaScript Vanilla (ES6+)
- Bootstrap 5
- AJAX para comunicação assíncrona

**Infraestrutura:**
- Docker e Docker Compose
- Nginx como servidor web

### Funcionalidades Extras Implementadas

- Autenticação com tokens JWT
- Validação de dados no frontend e backend
- Organização do código frontend com módulos ES6
- Sanitização de entrada de dados e medidas de segurança
- Testes unitários para as principais funcionalidades do backend

## Configuração e Execução

### Pré-requisitos

- Docker e Docker Compose instalados na máquina

### Passos para Execução

1. Clone este repositório:
   ```bash
   git clone https://github.com/kelvinsilvadev/tecsa-teste-tecnico.git
   cd tecsa-teste-tecnico
   ```

2. Inicie a aplicação com Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Acesse a aplicação no navegador:
   ```
   http://localhost:9000
   ```

4. Credenciais para teste (caso tenha implementado autenticação):
   ```
   Username: admin
   Senha: admin
   ```

### Estrutura do Projeto

```

├── backend/
│   ├── config.php
│   ├── composer.json
│   ├── init.sql                # Arquivo de inicialização do Banco de Dados
│   ├── phpunit.xml
│   └── api/                    # Endpoints da API
│       ├── index.php
│       ├── auth.php
│       └── .htaccess
│   └── tests/                  # Testes unitários
│       ├── TaskApiTest.php
├── frontend/
│   ├── index.html
│   ├── styles.css              # Estilos customizados
│   └── js/                     # Scripts JavaScript
│       ├── api.js              # Comunicação com a API
│       ├── auth.js             # Lógica de autenticação no frontend
│       ├── dom.js              # Manipulação da DOM
│       └── main.js             # Centralização de uso dos outros scripts.
├── Dockerfile                  # Imagem Docker
├── docker-compose.yml          # Definição dos serviços Docker
└── README.md


```

## API Endpoints

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /tasks   | Lista todas as tarefas |
| POST   | /tasks   | Cria uma nova tarefa |
| PUT    | /tasks/:id | Atualiza uma tarefa existente |
| DELETE | /tasks/:id | Remove uma tarefa |

### Autenticação (Funcionalidade Extra)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /auth/login | Realiza login e retorna um token JWT |

Para autenticação não foi possível criar uma tabela de usuários no banco, então estamos apenas validando se usuário e senha são 'admin', caso contrário retornamos credenciais inválidas e caso positivo retornamos um token de acesso.


## Considerações sobre Desenvolvimento

Durante o desenvolvimento deste projeto, foram considerados os seguintes aspectos:

- **Segurança**: Implementação de sanitização de dados, proteção contra CSRF e injeção de SQL
- **Performance**: Otimização de consultas SQL e carregamento assíncrono no frontend
- **Usabilidade**: Interface intuitiva e responsiva para diferentes dispositivos
- **Manutenibilidade**: Código organizado e documentado seguindo PSR-12

## Funcionalidades Futuras

- Implementação de filtros e busca de tarefas
- Categorização de tarefas com tags
- Sistema de notificações para prazos
- Dashboard com estatísticas de produtividade

## Autor

Kelvin Oliveira Romão Nunes

## Licença

MIT

## Considerações Finais

O banco de dados leva alguns segundos para ser inicializado dependendo do computador e isso pode fazer com que a api retorne erro 500 nos momentos iniciais.

Gostaria de agradecer imensamente a oportunidade a todo o time da Tecsa Group, foi um desafio interessante e acredito ter aprendido mais e melhorado ainda mais as minhas capacidades como desenvolvedor, espero que a entrega seja do agrado dos avaliadores.