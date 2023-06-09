exports.up = knex => knex.schema.createTable("favorite_foods", table => {
    table.integer("id_meal").references("id").inTable("meal").onDelete("CASCADE");
    table.integer("id_user").references("id").inTable("user").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("favorite_foods");
