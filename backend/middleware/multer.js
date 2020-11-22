const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets')
    },
    filename: function (req, file, cb) {
        const filename = Data.now() + "-" + file.originalname;
        req.body.videoSource = filename;
        cb(null, filename);
    }
});

exports.upload = multer({ storage: storage });