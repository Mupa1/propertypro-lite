require('dotenv').config();


module.exports = {
  development: {
    database: 'propertypro',
    username: 'postgres',
    password: 'pr0fe$$0r',
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  test: {
    database: 'property_test',
    username: 'postgres',
    password: 'pr0fe$$0r',
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
