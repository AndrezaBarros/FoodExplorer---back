const MealRepository = require("../repositories/mealRepository");
const MealService = require("../services/mealService");

class MealsController {
    async create(request, response) {
        const { name, description, category, ingredients, price } = request.body;
        const created_by = request.user.id;

        const mealRepository = new MealRepository();
        const mealService = new MealService(mealRepository);

        const meal_id = await mealService.execute({ name, description, category, ingredients, price, created_by })
        response.status(201).json(meal_id);
    }

    async update(request, response) {
        const { name, description, category, ingredients, price } = request.body;
        const id = request.params.id;
        const created_by = request.user.id;

        const mealRepository = new MealRepository();
        const mealService = new MealService(mealRepository);

        const meal = await mealService.update({ name, description, category, ingredients, price, id, created_by })

        return response.status(200).json(meal);
    }

    async show(request, response) {
        const id = request.params.id;
        
        const mealRepository = new MealRepository();
        const meal = await mealRepository.show({id});

        return response.status(200).json(meal);
    }

    async delete(request, response) {
        const id = request.params.id;

        const mealRepository = new MealRepository();
        await mealRepository.delete({id});

        return response.json();
    }

    async index(request, response) {
        const { name } = request.query;
        const user_id = request.user.id;

        const mealRepository = new MealRepository();
        const mealService = new MealService(mealRepository);

        const user = await mealRepository.getUser({user_id});
        const userType = user.type;

        const meals = await mealService.index({ name, user_id, userType });
        
        return response.status(200).json(meals);
    }
}

module.exports = MealsController;