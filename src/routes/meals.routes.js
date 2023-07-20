const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const MealsController = require("../controllers/mealController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsRoutes = Router();
const mealsController = new MealsController();
const upload = multer(uploadConfig.MULTER)


mealsRoutes.post("/", ensureAuthenticated, mealsController.create);
mealsRoutes.patch("/:meal_id/image", ensureAuthenticated, upload.single('image'), mealsController.uploadImage);
mealsRoutes.get("/:id", ensureAuthenticated, mealsController.index);
mealsRoutes.delete("/:id", ensureAuthenticated, mealsController.delete);
mealsRoutes.get("/", ensureAuthenticated, mealsController.index);

module.exports = mealsRoutes;