const FavoriteFoodsRepository = require("../repositories/favoriteFoodsRepository");

class FavoriteFoodsController {
    async create(request, response) {
        const {meal_id} = request.body;
        const user_id = request.user.id;

        const favoriteFoodsRepository = new FavoriteFoodsRepository();
        const favoriteFood = await favoriteFoodsRepository.create({meal_id, user_id })
        
        response.status(201).json(favoriteFood);
    }

    async index(request, response) {
        const user_id = request.user.id;
            
        const favoriteFoodsRepository = new FavoriteFoodsRepository();
        const favoriteFoods = await favoriteFoodsRepository.index({ user_id });

        return response.json(favoriteFoods);
    }

    async delete(request, response) {
        const id = request.params.id;

        const favoriteFoodsRepository = new FavoriteFoodsRepository();
        await favoriteFoodsRepository.delete({ id });

        return response.json();
    }
}

module.exports = FavoriteFoodsController;