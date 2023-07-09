## API CURSOS

### Iniciar um projeto `node`
```bash
npm init -y
```

### Instalando dependências
```bash
npm install express mysql2 sequelize dotenv
```
```bash
npm install -D sequelize-cli nodemon
```

### Crie o arquivo `Dockerfile`
```bash
FROM node:14

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run" ]
CMD ["start"]
```

### Crie o arquivo `docker-compose.yml`
```bash
version: '3'

services:
  api:
    build: .
    image: trybe-course
    restart: always
    ports:
      - 3001:3001
    environment:
      DB_USER: root
      DB_PASSWORD: password
      DB_NAME: orm_trybe
      DB_HOST: db
    depends_on: 
      - db
    command: dev
    volumes:
      - .:/app
  
  db:
    image: mysql:8.0.32
    container_name: database
    environment:
      MYSQL_ROOT_PASSWORD: password
    ports:
      - 3306:3306
    volumes:
      - ./db_data:/var/lib/mysql
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
## Iniciar o sequelize com as configurações iniciais
```bash
npx sequelize-cli init
```

### Configure o arquivo `src/config/config/js`
```bash
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'orm_trybe',
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'orm_trybe',
    host: process.env.DB_HOST || 'mysql',
    port: 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'orm_trybe',
    host: process.env.DB_HOST,
    port: 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
};
```
### Criando uma `model`
```bash
npx sequelize-cli model:generate --name Course --attributes name:string
 --attributes
```

### Configurando a `model course`
```bash
const CourseSchema = (sequelize, DataTypes) => {
  const CourseTable = sequelize.define('Course', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    creationDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  },
    {
      tableName: 'courses',
      underscored: true,
      timestamps: false
    });
  return CourseTable;
};

module.exports = CourseSchema;
```

### Criar uma `migration`
```bash
npx sequelize migration:generate --name course
```

### Configurando a `migration`
```bash
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creation_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};
```

### Subindo os `container Docker`
```bash
docker compose up -d --build
```
### Criar o banco de dados
```bash
npx sequelize db:create
```

### Executar as `migrations` pendentes
```bash
npx sequelize db:migrate
```

### Adicionar uma nova coluna a tabela existente
```bash
npx sequelize migration:generate --name add-column-duration-table-courses
```

### Configurando a migration
```bash
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'description',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('courses', 'duration');
  }
};
```
### Executar as `migrations` pendentes
```bash
npx sequelize db:migrate
```

### Criar `Seed`
```bash
npx sequelize seed:generate --name course
```

### Configurar a `migration Seed`
```bash
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('courses',
      [
        {
          name: 'Fullstack',
          description: 'Formação de P. Desenvolvedora Fullstack Junior',
          creation_date: '2019-06-01T00:00:00',
          active: true,
          duration: 12,
        },
        {
          name: 'Backend',
          description: 'Formação de P. Desenvolvedora Back-end Junior',
          creation_date: '2019-06-01T00:00:00',
          active: true,
          duration: 7,
        },
        {
          name: 'Mobile',
          description: 'Formação de P. Desenvolvedora Mobile Junior',
          creation_date: '2023-02-01T00:00:00',
          active: false,
          duration: 7,
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {});
  }
};
```

### Executar todas as seeds
```bash
npx sequelize db:seed:all
```