const db = require("../database/connect");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.Signup = (req, res) => {
    var user = req.body;
    user.email = user.email.toLowerCase();
    user.password = bcrypt.hashSync(user.password);
    var query = mysql.format("SELECT * FROM user where email=?", [user.email]);
    db.query(query, function (err, result, fields) {
        if (err) {
            res.status(500).json({ type: "failure", data: { message: err } });
            return;
        }
        if (result.length !== 0) {
            res.status(200).json({ type: "failure", data: { message: "Looks Like this Email is Already Registered" } });
            return;
        }
        var query = mysql.format("INSERT INTO user (name, email, password) VALUES (?,?,?)", [user.name, user.email, user.password]);
        db.query(query, function (err, result, fields) {
            if (err) {
                res.status(500).json({ type: "failure", data: { message: err } });
                return;
            }
            res.status(201).json({ type: "success", data: { message: "User Registered Successfully" } });
        });
    });
};

exports.Signin = (req, res) => {
    var user = { email: req.query.email.toLowerCase(), password: req.query.password };
    var query = mysql.format("SELECT * FROM user where email=?", [user.email]);
    db.query(query, async (err, result, fields) => {
        if (err) {
            res.status(500).json({ type: "failure", data: { message: err } });
            return;
        }
        if (result.length === 0) {
            res.status(200).json({ type: "failure", data: { message: "Wrong Credientials" } });
            return;
        }
        const isPasswordMatched = await bcrypt.compare(user.password, result[0]['password']);
        if (isPasswordMatched) {
            const token = JWT.sign({ username: user.email }, JWT_SECRET_KEY);
            res.status(200).json({ type: "success", data: { message: "Login Successfully", token: token } });
            return;
        }
        res.status(200).json({ type: "failure", data: { message: "Wrong Credientials" } });
        return;
    });
};
