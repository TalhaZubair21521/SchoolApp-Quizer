const db = require("../database/connect");
const mysql = require("mysql");

exports.SaveActivityQuestions = async (req, res) => {
   let data = JSON.parse(req.body.data);
   let videos = data.questions.filter((question) => {
      if (question.activity === "video") {
         return question;
      } else {
         return false;
      }
   })
   const videoSource = req.body.videoSource;
   videos.forEach(async (question) => {
      //Loop on Inserting Question
      var query = mysql.format("INSERT INTO question (type, question, option1, option2, option3, option4, answer, skill) VALUES (?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill]);
      var activity = question.activity;
      db.query(query, (err, result, fields) => {
         if (err) {
            // console.log(err);
            res.status(500).json({ type: "failure", data: { message: err } });
            return;
         }
         const questionID = result.insertId;
         //Inserting Activity Questions
         var query;
         query = mysql.format("INSERT INTO activityquestion (activity, videoURL, questionID, belongToID) VALUES (?,?,?,?)", [activity, videoSource, questionID, 1]);
         db.query(query, (err, result, fields) => {
            if (err) {
               res.status(500).json({ type: "failure", data: { message: err } });
               return;
            }
         })
      })
   });
   res.status(200).json({ type: "success", data: { msg: "Video Questions Successfully Added" } });
}













exports.SaveRevisionQuestions = async (req, res) => {
   const data = req.body.questions;
   let revisions = data.filter((question) => {
      if (question.activity === "revision") {
         return question;
      } else {
         return false;
      }
   })
   // Already Created
   revisions.forEach(async (question) => {
      //Loop on Inserting Question
      var query = mysql.format("INSERT INTO question (type, question, option1, option2, option3, option4, answer, skill) VALUES (?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill]);
      var activity = question.activity;
      db.query(query, (err, result, fields) => {
         if (err) {
            // console.log(err);
            res.status(500).json({ type: "failure", data: { message: err } });
            return;
         }
         const questionID = result.insertId;
         //Inserting Activity Questions
         var query;
         query = mysql.format("INSERT INTO activityquestion (activity, videoURL, questionID, belongToID) VALUES (?,?,?,?)", [activity, "noURL", questionID, 1]);
         db.query(query, (err, result, fields) => {
            if (err) {
               res.status(500).json({ type: "failure", data: { message: err } });
               return;
            }
         })
      })
   });
   res.status(200).json({ type: "success", data: { msg: "Revision Questions Successfully Added" } });
}






exports.SaveGameQuestions = async (req, res) => {
   const data = req.body.questions;
   let revisions = data.filter((question) => {
      if (question.activity === "game") {
         return question;
      } else {
         return false;
      }
   })
   // Already Created
   revisions.forEach(async (question) => {
      //Loop on Inserting Question
      var query = mysql.format("INSERT INTO question (type, question, option1, option2, option3, option4, answer, skill) VALUES (?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill]);
      var activity = question.activity;
      db.query(query, (err, result, fields) => {
         if (err) {
            // console.log(err);
            res.status(500).json({ type: "failure", data: { message: err } });
            return;
         }
         const questionID = result.insertId;
         //Inserting Activity Questions
         var query;
         query = mysql.format("INSERT INTO activityquestion (activity, videoURL, questionID, belongToID) VALUES (?,?,?,?)", [activity, "noURL", questionID, 1]);
         db.query(query, (err, result, fields) => {
            if (err) {
               res.status(500).json({ type: "failure", data: { message: err } });
               return;
            }
         })
      })
   });
   res.status(200).json({ type: "success", data: { msg: "Game Questions Successfully Added" } });
}






exports.SaveTestQuestions = async (req, res) => {
   const data = req.body.questions;
   let revisions = data.filter((question) => {
      if (question.activity === "test") {
         return question;
      } else {
         return false;
      }
   })
   // Already Created
   revisions.forEach(async (question) => {
      //Loop on Inserting Question
      var query = mysql.format("INSERT INTO question (type, question, option1, option2, option3, option4, answer, skill) VALUES (?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill]);
      var activity = question.activity;
      db.query(query, (err, result, fields) => {
         if (err) {
            // console.log(err);
            res.status(500).json({ type: "failure", data: { message: err } });
            return;
         }
         const questionID = result.insertId;
         //Inserting Activity Questions
         var query;
         query = mysql.format("INSERT INTO activityquestion (activity, videoURL, questionID, belongToID) VALUES (?,?,?,?)", [activity, "noURL", questionID, 1]);
         db.query(query, (err, result, fields) => {
            if (err) {
               res.status(500).json({ type: "failure", data: { message: err } });
               return;
            }
         })
      })
   });
   res.status(200).json({ type: "success", data: { msg: "Test Questions Successfully Added" } });
}