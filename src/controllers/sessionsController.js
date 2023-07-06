const SessionsRepository = require("../repositories/sessionsRepository");
const SessionsService = require("../services/sessionsService");

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body;

        const sessionsRepository = new SessionsRepository();
        const sessionsService = new SessionsService(sessionsRepository);

        const user = await sessionsService.verifyingData(email);

        await sessionsService.verifyingPassword({ password, email });

        const token = await sessionsService.createToken(email);


        return response.json({token, user});
    }
}

module.exports = SessionsController;