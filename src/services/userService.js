const { hash } = require("bcrypt");
const AppError = require("../utils/appError");

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }) {
        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists.length != 0) {
            throw new AppError("Este e-mail já está em uso");
        }

        const hashedPassword = await hash(password, 8);

        const newUser = await this.userRepository.create({ name, email, password: hashedPassword });

    }
}

module.exports = UserService;