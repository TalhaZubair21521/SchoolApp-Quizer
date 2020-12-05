const userController = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.post("/getQuestions", userController.GetQuestions);
router.post("/saveAnswers", userController.SaveAnswers);
router.get("/getScore", userController.GetScore);

exports.routes = router;