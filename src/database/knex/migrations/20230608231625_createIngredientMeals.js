exports.up = knex => knex.schema.createTable("ingredients_meals", table => {
    table.integer("id_meal").references("id").inTable("meals").onDelete("CASCADE");
    table.integer("id_ingredient").references("id").inTable("ingredients").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("ingredient_meals");
