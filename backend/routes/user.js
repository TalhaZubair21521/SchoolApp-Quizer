const userController = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.post("/signup", userController.Signup);
router.get("/signin", userController.Signin);

exports.routes = router;