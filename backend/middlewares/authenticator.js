const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.athenticate = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, jwtSecretKey, async (err, data) => {
            if (err) {
                res.status(401).json({ type: "failure", "result": "You are Logged Out" });
            } else {
                next();
            }
        });
    } else {
        res.status(400).json({ type: "failure", "result": "You are not Authorized for this Request" });
    }
}