/* eslint-disable node/exports-style */
exports.up = function (knex) {
    return knex.schema.createTable('metric', table => {
        table.increments();
        table.dateTime('timestamp').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('metric');
};
