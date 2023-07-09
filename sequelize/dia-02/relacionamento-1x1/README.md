## Relacionamento 1:1
![Alt text](image.png)

### Configurar o sequelize

### Instalar dependências
```bash
npm i -E express@4.17.1 nodemon@2.0.15
```

### Criar a migration `Employees`
```bash
npx sequelize migration:generate --name create-employees
```
### Configurando migration `Employees`
```bash
// src/migrations/[timestamp]-create-employee.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
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
    return queryInterface.dropTable('employees');
  },
};
```
### Criar a migration `Addresses`
```bash
npx sequelize migration:generate --name create-addresses
```
### Configurando a migration `Addresses`
```bash
// src/migrations/[timestamp]-create-addresses.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Configuram o que deve acontecer ao atualizar ou excluir um usuário
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'employee_id',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
          // Informa a tabela da referência da associação
          model: 'employees',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('addresses');
  },
};
```
### Subindo os container docker
```bash
docker compose up -d --build
```
### Criar o banco de dados
```bash
npx sequelize db:create
```
### Criando tabelas no banco de dados
```bash
npx sequelize db:migrate
```