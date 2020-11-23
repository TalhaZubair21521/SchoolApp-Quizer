const db = require("../database/connect");
const mysql = require("mysql");

exports.SaveActivityQuestions = async (req, res) => {
   const data = JSON.parse(req.body.data);
   const videoSource = req.body.videoSource;
   //Inserting Belong To Details
   var query = mysql.format("INSERT INTO belongto (classID, subjectID, chapterID) VALUES (?,?,?)", [1, 1, 1]);
   db.query(query, (err, result, fields) => {
      if (err) {
         console.log(err);
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      }
      const belongToID = result.insertId;
      //Loop on Questions
      data.questions.forEach(async (question) => {
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
            if (activity === "video") {
               query = mysql.format("INSERT INTO activityquestion (activity, videoURL, questionID, belongToID) VALUES (?,?,?,?)", [activity, videoSource, questionID, belongToID]);
            } else {
               query = mysql.format("INSERT INTO activityquestion (activity, videoURL, questionID, belongToID) VALUES (?,?,?,?)", [activity, "noURL", questionID, belongToID]);
            }
            db.query(query, (err, result, fields) => {
               if (err) {
                  res.status(500).json({ type: "failure", data: { message: err } });
                  return;
               }
            })
         })
      });
      res.status(200).json({ type: "success", data: { message: "Questions Inserted Successfully" } })
   });
}