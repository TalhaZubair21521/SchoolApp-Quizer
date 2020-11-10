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










exports.SaveActivityQuestions = async (req, res) => {
   const data = {
      classId: 1,
      subjectId: 2,
      chapterId: 3,
      questions: [
         { activity: "video", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "reading" },
         { activity: "video", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "B", skill: "observation" },
         { activity: "video", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "listening" },
         { activity: "video", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "C", skill: "writing" },
         { activity: "video", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "D", skill: "learning" },

         { activity: "revision", type: "oneword", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "reading" },
         { activity: "revision", type: "oneword", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "B", skill: "observation" },
         { activity: "revision", type: "oneword", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "listening" },
         { activity: "revision", type: "t/f", question: "What is your name?", option1: "", option2: "", option3: "", option4: "", answer: "true", skill: "writing" },
         { activity: "revision", type: "t/f", question: "What is your name?", option1: "", option2: "", option3: "", option4: "", answer: "false", skill: "learning" },

         { activity: "game", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "reading" },
         { activity: "game", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "B", skill: "observation" },
         { activity: "game", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "C", skill: "listening" },
         { activity: "game", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "writing" },
         { activity: "game", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "D", skill: "learning" },

         { activity: "test", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "D", skill: "memory" },
         { activity: "test", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "conceptual" },
         { activity: "test", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "C", skill: "application" },
         { activity: "test", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "analysis" },
         { activity: "test", type: "mcqs", question: "What is your name?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "B", skill: "observation" }
      ]
   };

   //Insert A BelongTo and Get ID

   //Loop on Questions
   //For Each Question add it to the database and Get the ID 
   //     Then insert the activty question by using belong ID and question id as well

   var query = mysql.format("INSERT INTO belongto (email, password) VALUES (?,?)", [admin.email, admin.password]);
   res.status(200).json({ type: "success", result: "Questions Recieved" });
}