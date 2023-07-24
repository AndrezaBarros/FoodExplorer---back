exports.up = knex => knex.schema.createTable("favorite_foods", table => {
    table.increments("id");
    table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("favorite_foods");
