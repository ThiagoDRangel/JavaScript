require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'db',
    host: process.env.DB_HOST || 'database',
    
    port: 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'db',
    host: process.env.DB_HOST || 'db',
    port: 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'database',
    host: process.env.DB_HOST,
    port: 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
};
