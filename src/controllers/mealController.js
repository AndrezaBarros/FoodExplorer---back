const MealRepository = require("../repositories/mealRepository");
const MealService = require("../services/mealService");

class MealController {
    async create(request, response) {
        const { name, description, category, ingredients, price, created_by } = request.body;
        const meal_id = "";
        const imageMealFilename = request.file.filename;

        const mealRepository = new MealRepository();
        const mealService = new MealService(mealRepository);

        await mealService.execute({ name, description, category, ingredients, price, created_by, meal_id, imageMealFilename})

        return response.status(201).json();
    }
}

module.exports = MealController;