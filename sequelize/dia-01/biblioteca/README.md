## API Biblioteca

### Criando arquivo `docker-compose.yml`
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
      DB_NAME: bteca
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
### Iniciando um projeto Node
```bash
npm init -y
```

### Adicionando o `Express` ao projeto
```bash
npm install -E express@4.17.1
```

### Crie o arquivo `index.js`

### Instale o `sequelize`
```bash
npm install -E sequelize@6.3.4
```

### Instale o `MySQL`
```bash
npm install -E mysql2@2.1.0
```

### Instale o `sequelize-cli`
```bash
npm install --save-dev --save-exact sequelize-cli@6.2.0
```

### Inicie o sequelize `ORM`
```bash
mkdir src && cd src && npx sequelize-cli init && cd ..
```

### Configurando o arquivo `src/config/config.js`
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

### Altere o nome do arquivo `config.json` para `config.js`

### Configure o arquivo `index.js`
```bash
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
```