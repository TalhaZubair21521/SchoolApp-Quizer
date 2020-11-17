const adminController = require("../controllers/admin");

const express = require("express");
const router = express.Router();

router.post("/addQuestions", adminController.SaveActivityQuestions);

exports.routes = router;