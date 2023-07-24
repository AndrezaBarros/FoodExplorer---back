const { Router } = require("express");

const FavoriteFoodsController = require("../controllers/favoriteFoodsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const favoriteFoodsRoutes = Router();
const favoriteFoodsController = new FavoriteFoodsController();

favoriteFoodsRoutes.post("/", ensureAuthenticated, favoriteFoodsController.create);
favoriteFoodsRoutes.get("/", ensureAuthenticated, favoriteFoodsController.index);
favoriteFoodsRoutes.delete("/:id", ensureAuthenticated, favoriteFoodsController.delete);

module.exports = favoriteFoodsRoutes;