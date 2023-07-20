exports.up = knex => knex.schema.createTable("meals", table => {
    table.increments("id");
    table.text("name");
    table.text("description");
    table.text("image");
    table.text("category");
    table.text("price").notNull();

    table.integer("created_by").references("id").inTable("users");
})

exports.down = knex => knex.schema.dropTable("meals");
