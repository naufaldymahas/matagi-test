// Update with your config settings.
require('ts-node/register')

module.exports = {
  client: 'mysql',
  connection: {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'matagi_db'
  },
  migrations: {
      directory: './db/migrations',
      extension: 'ts'
  }
}