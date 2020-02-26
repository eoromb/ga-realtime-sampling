/* eslint-disable node/exports-style */
exports.up = function (knex) {
    return knex.schema.createTable('metric', table => {
        table.increments();
        table.string('metric').notNullable();
        table.dateTime('timestamp').notNullable();
        table.float('value');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('metric');
};
