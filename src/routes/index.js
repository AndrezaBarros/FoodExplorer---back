const { Router } = require("express");
const usersRouter = require("./users.routes");
const mealsRouter = require("./meals.routes");
const sessionsRouter = require("./sessions.routes");
const favoriteFoodsRouter = require("./favorite_foods.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/meals", mealsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/favorite_foods", favoriteFoodsRouter);

module.exports = routes;