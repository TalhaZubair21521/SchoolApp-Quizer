const adminController = require("../controllers/admin");

const express = require("express");
const router = express.Router();

const VideoSaverMiddleware = require("../middleware/multer");

router.post("/addQuestions", VideoSaverMiddleware.upload.single("video"), adminController.SaveActivityQuestions);

exports.routes = router;