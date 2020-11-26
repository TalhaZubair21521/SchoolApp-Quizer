const adminController = require("../controllers/admin");

const express = require("express");
const router = express.Router();

const VideoSaverMiddleware = require("../middleware/multer");

router.post("/videoQuestions", VideoSaverMiddleware.upload.single("video"), adminController.SaveVideoQuestions);
router.post("/revisionQuestions", adminController.SaveRevisionQuestions);
router.post("/gameQuestions", adminController.SaveGameQuestions);
router.post("/testQuestions", adminController.SaveTestQuestions);

exports.routes = router;