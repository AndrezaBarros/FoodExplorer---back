const MealRepository = require("../repositories/mealRepository");
const MealService = require("../services/mealService");
const knex = require("../database/knex");
class MealController {
    async create(request, response) {
        const { name, description, category, ingredients, price } = request.body;
        const created_by = request.user.id;


        const mealRepository = new MealRepository();
        const mealService = new MealService(mealRepository);

        const meal_id = await mealService.execute({ name, description, category, ingredients, price, created_by })
        response.status(201).json(meal_id);
    }


    async uploadImage(request, response) {
        const image = request.file.filename;
        const { meal_id } = request.params;

        const mealRepository = new MealRepository();
        const mealService = new MealService(mealRepository);

        await mealService.configMealImage({ image, meal_id });

        return response.status(200).json();
    }

    async show(request, response) {
        const { id } = request.params;

        const meal = await knex("meals").where({ id }).first();

        meal.ingredients = await knex("ingredients")
            .where("meal_id", meal.id);

        return response.json(meal);
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("meals").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { name } = request.query;
        const user_id = request.user.id;
        const user = await knex("users").where("id", user_id).first();
        const userType = user.type;

        let meals = [];

        if(userType == "Client") {
            if (name != undefined) {
                meals = await knex("meals").whereLike("name", `%${name}%`);
            } else {
                meals = await knex("meals");
            }

            return response.json(meals);
        }

        if (name != undefined && name != "" ) {
            meals = await knex("meals")
                .where("created_by", user_id).whereLike("name", `%${name}%`);
        } else {
            meals = await knex("meals")
                .where("created_by", user_id);
        }

        return response.json(meals);
    }
}

module.exports = MealController;