exports.up = knex => knex.schema.createTable("meals", table => {
    table.increments("id");
    table.text("name");
    table.text("description");
    table.text("image");
    table.text("category");
    table.float("price").notNull();

    table.text("created_by").references("id").inTable("user");
})

exports.down = knex => knex.schema.dropTable("meals");
