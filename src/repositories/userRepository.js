class UserRepository {
    async findByEmail(email) {
        const checkUserExists = await knex("users").where("email", email);

        return checkUserExists;
    }

    async create({name, email, password}) {
        const newUser = await knex("users").insert({
            name: name,
            email: email,
            password: hashedPassword
        });

        return newUser;
    }
}

module.exports = UserRepository;