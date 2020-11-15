const userController = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.get("/getQuestions", userController.GetQuestions);
router.post("/saveAnswers", userController.SaveAnswers);

exports.routes = router;