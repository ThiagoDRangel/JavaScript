## Configurando Sequelize

### Iniciando uma aplicação node.js
```bash
mkdir app-with-sequelize && cd app-with-sequelize

npm init -y

npm install -E sequelize@6.3.4
```

### Crie o arquivo `.env` na raiz do projeto
```bash
MYSQL_USER=root
MYSQL_PASSWORD=senha_mysql
MYSQL_DATABASE=orm_example
MYSQL_HOST=localhost
```

### Instalar sequelize-cli
```bash
npm install -D -E sequelize-cli@6.2.0
```

### Instalar o MySQL
```bash
npm install -E mysql2@2.1.0
```

### Iniciando o sequelize
```bash
mkdir src && cd src && npx sequelize-cli init && cd ..
```

### Crie o arquivo `.sequelizerc` na raiz do projeto
```bash
const path = require('path');

module.exports = {
  'config': path.resolve('src', 'config', 'config.js'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations'),
};
```

### Altere o nome do arquivo `src/config/config.json` para `config.js`
```bash
const config = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
```

### Atualize o nome do arquivo `config.js` em src/models/index

### Criar um container docker MySQL
```bash
docker container run --name container-mysql -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql:8.0.29
```

### Criar o `banco de dados` no container MySQL `linux`
```bash
env $(cat .env) npx sequelize db:create
```

### Criar o `banco de dados` no container MySQL `Windows`
```bash
npm install -g dotenv-cli
```
```bash
dotenv -e .env npx sequelize db:create
```

### Acessar o container pelo terminal
```bash
docker exec -it container-mysql bash
```

### Entrar no terminal do MySQL
```bash
mysql -u root -p
```

### Visualizar os bancos de dados existentes
```bash
show databases;
```

### Criando arquivo `user.model.js`
```bash
const sara = await User.create({
  fullName: 'Sara Silva Santos',
  email: 'sara.ss@trybe.com',
});

console.log(sara instanceof User); // true
console.log(sara.name); // "Sara Silva Santos"

module.exports = UserModel;
```

### Gerar uma migration `create-user`
```bash
npx sequelize migration:generate --name create-user
```

### configurando a migration
```bash
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
   },

   down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
   }
 };
```

### Executando a migration
```bash
dotenv -e .env npx sequelize db:migrate
```

### Caso precise reverter a migration executada
```bash
dotenv -e .env npx sequelize db:migrate:undo
```

### Criando uma Seed
```bash
npx sequelize seed:generate --name users
```

### Configurando a Seed
```bash
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        fullName: 'Leonardo',
        email: 'leo@test.com',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        fullName: 'JEduardo',
        email: 'edu@test.com',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
```

### Executar a Seed
```bash
env $(cat .env) npx sequelize db:seed:all
dotenv -e .env npx sequelize db:seed:all
```

### Reverter a Seed
```bash
env $(cat .env) npx sequelize db:seed:undo:all
dotenv -e .env npx sequelize db:seed:undo:all
```