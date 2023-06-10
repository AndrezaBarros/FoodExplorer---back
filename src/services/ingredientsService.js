class IngredientsService {
    constructor(ingredientsRepository) {
        this.ingredientsRepository = ingredientsRepository;
    }

    async execute(created_by) {
        this.ingredientsRepository.listIngredientsByCreator(created_by);
    }
}

module.exports = IngredientsService;