const MealRepository = require("../repositories/mealRepository");
const MealService = require("../services/mealService");

class MealsImageController {
    async uploadImage(request, response) {
        const image = request.file.filename;
        const { meal_id } = request.params;

        const mealRepository = new MealRepository();
        const mealService = new MealService(mealRepository);

        await mealService.configMealImage({ image, meal_id });

        return response.status(200).json();
    }
}

module.exports = MealsImageController;