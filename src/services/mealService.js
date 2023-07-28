const DiskStorage = require("../providers/diskStorage");
const AppError = require("../utils/appError")
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

    async update({name, description, category, ingredients, price, id, created_by }) {
        let meal = await this.mealRepository.findMeal({id});

        if(!meal) {
            throw new AppError("Usuário não encontrado");
        }

        meal.name = name ?? meal.name;
        meal.description = description ?? meal.description; 
        meal.category = category ?? meal.category; 
        meal.price = price ?? meal.price; 

        await this.mealRepository.deletingCurrentListIngredients({id});

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                meal_id: id,
                name: ingredient.name,
                created_by
            }
        });

        await this.mealRepository.insertingNewIngredientsList({ingredientsInsert});

        meal = await this.mealRepository.update({name, description, category, price, id});

        return meal;
    }

    async index({name, user_id, userType }) {
        let meals = [];

        if(userType == "Client") {
            meals = await this.mealRepository.indexForClient({name, meals});

            return meals;
        }

        meals = await this.mealRepository.indexForRestaurant({name, user_id, meals});

        return meals;
    }
}

module.exports = MealService;