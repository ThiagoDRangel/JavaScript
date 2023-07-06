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

### Criar o banco de dados no container MySQL
```bash
env $(cat .env) npx sequelize db:create
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