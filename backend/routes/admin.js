const adminController = require("../controllers/admin");

const express = require("express");
const router = express.Router();

router.post("/signup", adminController.Signup);
router.get("/signin", adminController.Signin);

exports.routes = router;