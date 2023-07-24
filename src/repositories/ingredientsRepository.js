const knex = require("../database/knex");

class IngredientsRepository {
    async listIngredientsByCreator(created_by) {
        const ingredients = await knex("ingredient_meals").where({ created_by });

        return ingredients;
    }
    
}

module.exports = IngredientsRepository;