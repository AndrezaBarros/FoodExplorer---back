const DiskStorage = require("../providers/DiskStorage");
class MealService {
    constructor(mealRepository) {
        this.mealRepository = mealRepository;
    }

    async configMealImage({image, meal_id }) {
        const diskStorage = new DiskStorage();

        const filename = await diskStorage.saveFile(image);
        
        await this.mealRepository.uploadMealImage({filename, meal_id });
    }

    async execute({ name, description, category, price, created_by, ingredients }) {

        const meal_id = await this.mealRepository.create({
            name, description, category, price, created_by
        });

        const ingredientsInsert = ingredients.map(name => {
            return {
                meal_id,
                name,
                created_by
            }
        });

        await this.mealRepository.createIngredients(ingredientsInsert);

        return meal_id
    }
}

module.exports = MealService;