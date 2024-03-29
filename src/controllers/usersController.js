const UserRepository = require("../repositories/userRepository");
const UserService = require("../services/userService");

class UsersController {
    async create(request, response) {
        const { name, email, password, type } = request.body;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.execute({ name, email, password, type });

        response.status(201).json();
    }

    async getUserType(request, response) {
        const user_id = request.user.id;

        const userRepository = new UserRepository();
        const userType = await userRepository.getUserType({ user_id });

        return userType;
    }

    async addMealToFavorite(request, response) {
        const { user_id, meal_id } = request.body;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.addMealToFavorite({ user_id, meal_id });

        response.status(201).json();
    }
}

module.exports = UsersController;