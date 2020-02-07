import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('users', table => {
        table.string('indonesianID', 17).primary().notNullable()
        table.string('name').notNullable()
        table.dateTime('birthday').notNullable()
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt')
        table.timestamp('deletedAt')
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('users')
}
