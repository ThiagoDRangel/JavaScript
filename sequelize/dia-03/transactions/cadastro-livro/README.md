## Gerenciando transações com o Sequelize

### Iniciando um projeto `node`
```bash
npm init -y
```
### Instalando dependências
```bash
npm i -E express@4.17.1 nodemon@2.0.15 sequelize@6.3.4 mysql2@2.1.0
npm i -D -E sequelize-cli@6.2.0
```
### Crie o arquivo `.sequelizerc`
```bash
const path = require('path');

module.exports = {
    'config': path.resolve('src', 'config', 'config.js'),
    'models-path': path.resolve('src', 'models'),
    'seeders-path': path.resolve('src', 'seeders'),
    'migrations-path': path.resolve('src', 'migrations'),
};
```
### Crie e acesse a pasta `src`
```bash
mkdir src && cd src
```
### Inicie o Sequelize
```bash
npx sequelize-cli init
```
### Organizando o projeto
```bash
mkdir src/controllers src/services
```
### Crie o componente `app.js`
```bash
touch src/app.js
echo -e "const express = require('express');

const app = express();

app.use(express.json());

module.exports = app;
" >> src/app.js
touch src/server.js
```
### Crie o componente `server.js`
```bash
touch src/server.js

echo -e "const app = require('./app');
const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(\`Ouvindo na porta \${PORT}\`));
" >> src/server.js 
```
### `services` e `controllers`
```bash
touch src/services/userBook.service.js src/controllers/userBook.controller.js
```

### Subir o container docker
```bash
docker container run --name bookTeca -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql:8.0.29
```

### Crie o o arquivo `.env`
```bash
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=bookTeca
MYSQL_HOST=localhost
```
### Criar o banco de dados
```bash
dotenv -e .env npx sequelize db:create
```
### Crie a migration `books`
```bash
npx sequelize migration:generate --name table-books
```
### configure o arquivo `*.table-books`
```bash
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      releaseYear: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'release_year', // só precisamos definir explicitamente os campos com nomes compostos, por causa da semelhança entre camelCase e snake_case
      },
      totalPages: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'total_pages', // ambos começam com letra minúscula, quando temos duas palavras que existe diferença
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('books');
  },
};
```

### Crie a migration `users`
```bash
npx sequelize migration:generate --name table-users
```

### Configure o arquivo `*.table-users`
```bash
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'last_name',
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
```
### Crie a migration `users-books`
```bash
npx sequelize migration:generate --name table-users-books
```
### Configure o arquivo `*.users-books`
```bash
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_books', {
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      bookId: {
        type: Sequelize.INTEGER,
        field: 'book_id',
        references: {
          model: 'books',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users_books');
  },
};
```

### Crie a `Seed books`
```bash
npx sequelize seed:generate --name books
```
### Configure o arquivo `Seed books`
```bash
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'books',
      [
        { name: 'O que o sol faz com as flores', release_year: 2017, total_pages: 159 },
        { name: 'Ensinando a transgredir: A educação como prática da liberdade', release_year: 2017, total_pages: 288 },
        { name: 'Cem Anos de Solidão', release_year: 1967, total_pages: 419 },
        { name: 'Primeiros Pesadelos', release_year: 2022, total_pages: 300 },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('books', null, {});
  },
};
```

### Crie a `Seed users`
```bash
npx sequelize seed:generate --name users
```
### Configure a `Seed users`
```bash
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Graciliano',
          last_name: 'Ramos',
          age: 61,
        },
        {
          first_name: 'Brené',
          last_name: 'Brown',
          age: 56,
        },
        {
          first_name: 'Djamila',
          last_name: 'Ribeiro',
          age: 42,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
```

### Crie a `Seed user-books`
```bash
npx sequelize seed:generate --name user-books
```
### Configure a `Seed user-books`
```bash
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'users_books',
      [
        { user_id: 1, book_id: 1 },
        { user_id: 1, book_id: 3 },
        { user_id: 2, book_id: 1 },
        { user_id: 2, book_id: 2 },
        { user_id: 3, book_id: 1 },
        { user_id: 3, book_id: 2 },
        { user_id: 3, book_id: 3 },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users_books', null, {});
  },
};
```

### Drop o banco de dados
```bash
dotenv -e .env npx sequelize db:drop
```
### Crie o banco de dados
```bash
dotenv -e .env npx sequelize db:create
```
### Crie as tabelas usando as migrations
```bash
dotenv -e .env npx sequelize db:migrate
```
### Popule as tabelas usando os seeds
```bash
dotenv -e .env npx sequelize db:seed:all
```

### Camada do serviço `src/services/userBook.service.js`
```bash
const { User, Book } = require('../models');

const getUsersBooksById = (id) => User.findOne({
  where: { id },
  include: [{ model: Book, as: 'books', through: { attributes: [] } }],
});

module.exports = {
  getUsersBooksById,
};
```

### Camada de contrle `src/controllers/userBook.controller.js`
```bash
const userBookService = require('../services/userBook.service');

const getUsersBooksById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userBookService.getUsersBooksById(id);

    if (!user)
      return res.status(404).json({ message: 'Pessoa não encontrada' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  getUsersBooksById,
};
```