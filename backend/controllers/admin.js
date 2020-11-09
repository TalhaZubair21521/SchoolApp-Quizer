const db = require("../database/connect");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.Signup = (req, res) => {
    var admin = req.body;
    admin.email = admin.email.toLowerCase();
    admin.password = bcrypt.hashSync(admin.password);
    var query = mysql.format("SELECT * FROM admin where email=?", [admin.email]);
    db.query(query, function (err, result, fields) {
        if (err) {
            res.status(500).json({ type: "failure", data: { message: err } });
            return;
        }
        if (result.length !== 0) {
            res.status(200).json({ type: "failure", data: { message: "Looks Like this Email is Already Registered" } });
            return;
        }
        var query = mysql.format("INSERT INTO admin (email, password) VALUES (?,?)", [admin.email, admin.password]);
        db.query(query, function (err, result, fields) {
            if (err) {
                res.status(500).json({ type: "failure", data: { message: err } });
                return;
            }
            res.status(201).json({ type: "success", data: { message: "admin Registered Successfully" } });
        });
    });
};

exports.Signin = (req, res) => {
    var admin = { email: req.query.email.toLowerCase(), password: req.query.password };
    var query = mysql.format("SELECT * FROM admin where email=?", [admin.email]);
    db.query(query, async (err, result, fields) => {
        if (err) {
            res.status(500).json({ type: "failure", data: { message: err } });
            return;
        }
        if (result.length === 0) {
            res.status(200).json({ type: "failure", data: { message: "Wrong Credientials" } });
            return;
        }
        const isPasswordMatched = await bcrypt.compare(admin.password, result[0]['password']);
        if (isPasswordMatched) {
            const token = JWT.sign({ adminname: admin.email }, JWT_SECRET_KEY);
            res.status(200).json({ type: "success", data: { message: "Login Successfully", token: token } });
            return;
        }
        res.status(200).json({ type: "failure", data: { message: "Wrong Credientials" } });
        return;
    });
};






