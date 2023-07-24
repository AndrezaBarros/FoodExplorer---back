const knex = require("../database/knex");

class FavoriteFoodsRepository {
    async create ({meal_id, user_id}) {
        const favoriteFood = await knex("favorite_foods").insert({
            meal_id,
            user_id
        });

        return favoriteFood;
    }

    async index ({user_id}) {
        const favoriteFoods = await knex
        .select("f.id", "m.image", "m.name")
        .from("meals as m")
        .join("favorite_foods as f", "f.meal_id", "=", "m.id" )
        .where("f.user_id", user_id);

        return favoriteFoods;
    }

    async delete ({id}) {
        await knex("favorite_foods").where("id", id).delete();
    }
}

module.exports = FavoriteFoodsRepository;