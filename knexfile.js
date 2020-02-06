module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'matagi_db'
    },
    migrations: {
        directory: './db/migrations'
    }
}