const IngredientsRepository = require("../repositories/ingredientsRepository");
const IngredientsService = require("../services/ingredientsService");

class IngredientsController {
  
    async index(request, response) {
        const created_by = request.user.id;

        const ingredientsRepository = new IngredientsRepository();
        const ingredientsService = new IngredientsService(ingredientsRepository);

        await ingredientsService.execute(created_by);

        return response.json(ingredients);
    }
}

module.exports = IngredientsController;