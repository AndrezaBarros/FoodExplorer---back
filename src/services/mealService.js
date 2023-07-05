class MealService {
    constructor(mealRepository) {
        this.mealRepository = mealRepository;
    }

    async execute({ name, description, category, price, created_by, ingredients, imageMealFilename }) {
        const diskStorage = new DiskStorage();

        if(meal.image) {
            await diskStorage.deleteFile(meal.image);
        }

        const filename = await diskStorage.saveFile(imageMealFilename);

        const meal_id = await this.mealRepository.create({
            name, description, category, price, created_by, filename
        });

        const ingredientsInsert = ingredients.map(name => {
            return {
                meal_id,
                name,
                created_by
            }
        });

        await this.mealRepository.createIngredients(ingredientsInsert);
    }
}

module.exports = MealService;