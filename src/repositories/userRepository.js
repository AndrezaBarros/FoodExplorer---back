const knex = require("../database/knex");
class UserRepository {
    async findByEmail(email) {
        const checkUserExists = await knex("users").where("email", email);

        return checkUserExists;
    }

    async create({name, email, hashedPassword, role}) {
        const newUser = await knex("users").insert({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });

        return newUser;
    }
    
    async addMealToFavorite({meal_id, user_id}) {
        await knex("favorite_foods").insert({
            user_id,
            meal_id
        });
    }
}

module.exports = UserRepository;