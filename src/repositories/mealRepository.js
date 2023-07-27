const knex = require("../database/knex");

class MealRepository {
    async create({ name, description, category, price, created_by }) {

        const [meal_id] = await knex("meals").insert({
            name,
            description,
            category,
            price,
            created_by
        });

        return meal_id;
    }

    async uploadMealImage({ filename, meal_id }) {
        const meal = await knex("meals").where("id", meal_id).first();

        meal.image = filename;

        await knex("meals").where("id", meal_id).first().update(meal);
    }

    async createIngredients(ingredientsInsert) {
        await knex("ingredients").insert(ingredientsInsert);
    }

    async findMeal({ id }) {
        const meal = await knex("meals").where("id", id).first();

        return meal;
    }

    async deletingCurrentListIngredients({ id }) {
        await knex("ingredients").where("meal_id", id).del();
    }

    async insertingNewIngredientsList({ ingredientsInsert }) {
        await knex("ingredients").insert(ingredientsInsert);
    }

    async update({ name, description, category, price, id }) {
        const meal = await knex("meals").where("id", id).first().update({
            name,
            description,
            category,
            price,
        });

        return meal;
    }

    async show({ id }) {
        const meal = await knex("meals").where("id", id).first();

        meal.ingredients = await knex("ingredients")
            .where("meal_id", id);

        return meal;
    }

    async delete({ id }) {
        await knex("meals").where("id", id).delete();
    }

    async getUser({ user_id }) {
        const user = await knex("users").where("id", user_id).first();

        return user;
    }

    async indexForClient({ name, meals }) {
        if (name != undefined) {
            meals = await knex("meals").whereLike("name", `%${name}%`);
            meals.ingredients = await knex("ingredients").whereLike("name", `%${name}%`);
        } else {
            meals = await knex("meals");
        }

        return meals;
    }

    async indexForRestaurant({ name, user_id, meals }) {
        if (name != undefined && name != "") {
            meals = await knex.distinct().select("m.id", "m.name", "m.description", "m.image", "m.category", "m.price", "m.created_by")
                .from("meals as m")
                .join("ingredients as i", "i.meal_id", "=", "m.id")
                .where("m.created_by", user_id)
                .andWhere("m.name", "like", `%${name}%`)
                .orWhere("i.name", "like", `%${name}%`);

            for (let i = 0; i < meals.length; i++) {
                meals[i].ingredients = await knex("ingredients").where("meal_id", meals[i].id);
            }
        } else {
            meals = await knex("meals")
                .where("created_by", user_id);
        }

        return meals;
    }


}

module.exports = MealRepository;