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

    async uploadMealImage({filename, meal_id}) {
        const meal = await knex("meals").where("id", meal_id).first();

        meal.image = filename;

        await knex("meals").where("id", meal_id).first().update(meal);
    }

    async createIngredients(ingredientsInsert) {
        await knex("ingredients").insert(ingredientsInsert);
    }
}

module.exports = MealRepository;