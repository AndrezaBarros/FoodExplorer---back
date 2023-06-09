const UserRepository = require("../repositories/userRepository");
const UserService = require("../services/userService");

class UsersController {
    async create(request, response) {
        const {name, email, password} = request.body;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.execute({name, email, password});
        
        response.status(201).json();
    }
}

module.exports = UsersController;