const {Router} = require("express");

const sessionsRoutes = Router();
const SessionsController = require("../controllers/sessionsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes