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
    use_env_variable: DATABASE_URL,
    dialect: 'postgres'
  }
};
