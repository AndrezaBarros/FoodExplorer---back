const {Router} = require("express");

const usersRoutes = Router();
const UsersController = require("../controllers/usersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersController = new UsersController();


usersRoutes.post("/", usersController.create);
usersRoutes.post("/favorite-foods",ensureAuthenticated, usersController.addMealToFavorite);
usersRoutes.get("/",ensureAuthenticated, usersController.getUserType);

module.exports = usersRoutes