const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const MealsController = require("../controllers/mealsController");
const MealsImageController = require("../controllers/mealsImageController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsRoutes = Router();
const mealsController = new MealsController();
const mealsImageController = new MealsImageController();
const upload = multer(uploadConfig.MULTER)


mealsRoutes.post("/", ensureAuthenticated, mealsController.create);
mealsRoutes.put("/:id", ensureAuthenticated, mealsController.update);
mealsRoutes.patch("/:meal_id/image", ensureAuthenticated, upload.single('image'), mealsImageController.uploadImage);
mealsRoutes.get("/:id", ensureAuthenticated, mealsController.show);
mealsRoutes.delete("/:id", ensureAuthenticated, mealsController.delete);
mealsRoutes.get("/", ensureAuthenticated, mealsController.index);

module.exports = mealsRoutes;