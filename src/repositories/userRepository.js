const knex = require("../database/knex");
class UserRepository {
    async findByEmail(email) {
        const checkUserExists = await knex("users").where("email", email);

        return checkUserExists;
    }

    async create({ name, email, hashedPassword, type }) {
        const newUser = await knex("users").insert({
            name: name,
            email: email,
            password: hashedPassword,
            type: type
        });

        return newUser;
    }

    async addMealToFavorite({ meal_id, user_id }) {
        await knex("favorite_foods").insert({
            user_id,
            meal_id
        });
    }

    async getUserType({user_id}) {
        const userType = await knex("users").select("type").where("id", user_id);

        return userType;
    }
}

module.exports = UserRepository;