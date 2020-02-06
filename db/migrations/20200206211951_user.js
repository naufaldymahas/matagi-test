
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.integer('indonesianID').primary().notNullable()
    table.string('name').notNullable()
    table.datetime('birthday').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('deletedAt').nullable()
    table.timestamp('updatedAt').nullable()
  })
};

exports.down = function(knex) {
  
};
