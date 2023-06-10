const knex = require("../database/knex");

class MealRepository {
    async create({name, description, category, price, created_by}) {
        const [meal_id] = await knex("meals").insert({
            name,
            description,
            category,
            price,
            created_by
        });

        return meal_id;
    }

    async createIngredients(ingredientsInsert) {
        await knex("ingredients").insert(ingredientsInsert);
    }
}

module.exports = MealRepository;