const { Router } = require("express");
const MealsController = require("../controllers/mealController");
const uploadConfig = require("../configs/upload");

const mealsRoutes = Router();
const mealsController = new MealsController();


mealsRoutes.post("/", mealsController.create);

module.exports = mealsRoutes;