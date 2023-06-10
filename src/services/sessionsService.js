const { sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const AppError = require("../utils/appError");
const authConfig = require("../configs/auth");

class SessionsService {
    constructor(sessionsRepository) {
        this.sessionsRepository = sessionsRepository;
    }

    async verifyingData(email) {
        const user =  await this.sessionsRepository.create(email);

        if (!user) {
            throw new AppError("Email e/ou senha incorreta", 401);
        }
    }

    async verifyingPassword({password, email}) {
        const user =  await this.sessionsRepository.create(email);

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Email e/ou senha incorreta");
        }
    }

    async createToken(email) {
        const user =  await this.sessionsRepository.create(email);

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        return token;
    }
}

module.exports = SessionsService;