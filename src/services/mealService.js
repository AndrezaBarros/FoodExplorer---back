class MealService {
    constructor(mealRepository) {
        this.mealRepository = mealRepository;
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
    }
}

module.exports = MealService;