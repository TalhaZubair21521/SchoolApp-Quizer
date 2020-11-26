const db = require("../database/connect");
const mysql = require("mysql");

exports.SaveVideoQuestions = async (req, res) => {
   let data = JSON.parse(req.body.data);
   let videos = data.questions.filter((question) => {
      if (question.activity === "video") {
         return question;
      } else {
         return false;
      }
   });
   var query = mysql.format("Select COUNT(questionID) AS counts from question where classID=? AND subjectID=? AND chapterID=? AND activity=?", [data.class, data.subject, data.chapter, "video"]);
   db.query(query, (err, result, fields) => {
      if (err) {
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      }
      if (result[0].counts > 0) {
         res.status(200).json({ type: "fail", data: { msg: "Data Already Exists" } });
         return;
      } else {
         videos.forEach(async (question) => {
            var query = mysql.format("INSERT INTO question (type, question, option1, option2, option3, option4, answer, skill,classID,subjectID,chapterID,activity,videoURL) VALUES (?,?,?,?, ?,?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill, data.class, data.subject, data.chapter, question.activity, req.body.videoSource]);
            db.query(query, (err, result, fields) => {
               if (err) {
                  res.status(500).json({ type: "failure", data: { message: err } });
                  return;
               }
            })
         });
         res.status(200).json({ type: "success", data: { result: "Video Questions Data Added Successfully" } });
      }
   });
}













exports.SaveRevisionQuestions = async (req, res) => {
   const data = req.body;
   let revisions = data.questions.filter((question) => {
      if (question.activity === "revision") {
         return question;
      } else {
         return false;
      }
   })
   var query = mysql.format("Select COUNT(questionID) AS counts from question where classID=? AND subjectID=? AND chapterID=? AND activity=?", [data.class, data.subject, data.chapter, "revision"]);
   db.query(query, (err, result, fields) => {
      if (err) {
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      }
      if (result[0].counts > 0) {
         res.status(200).json({ type: "fail", data: { msg: "Data Already Exists" } });
         return;
      } else {
         revisions.forEach(async (question) => {
            var query = mysql.format("INSERT INTO question (type, question, option1, option2, option3, option4, answer, skill,classID,subjectID,chapterID,activity,videoURL) VALUES (?,?,?,?, ?,?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill, data.class, data.subject, data.chapter, question.activity, "noURL"]);
            db.query(query, (err, result, fields) => {
               if (err) {
                  res.status(500).json({ type: "failure", data: { message: err } });
                  return;
               }
            })
         });
         res.status(200).json({ type: "success", data: { result: "Revisions Questions Data Added Successfully" } });
      }
   });
}






exports.SaveGameQuestions = async (req, res) => {
   const data = req.body;
   let games = data.questions.filter((question) => {
      if (question.activity === "game") {
         return question;
      } else {
         return false;
      }
   })
   var query = mysql.format("Select COUNT(questionID) AS counts from question where classID=? AND subjectID=? AND chapterID=? AND activity=?", [data.class, data.subject, data.chapter, "game"]);
   db.query(query, (err, result, fields) => {
      if (err) {
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      }
      if (result[0].counts > 0) {
         res.status(200).json({ type: "fail", data: { msg: "Data Already Exists" } });
         return;
      } else {
         games.forEach(async (question) => {
            var query = mysql.format("INSERT INTO question (type, question, option1, option2, option3, option4, answer, skill,classID,subjectID,chapterID,activity,videoURL) VALUES (?,?,?,?, ?,?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill, data.class, data.subject, data.chapter, question.activity, "noURL"]);
            db.query(query, (err, result, fields) => {
               if (err) {
                  res.status(500).json({ type: "failure", data: { message: err } });
                  return;
               }
            })
         });
         res.status(200).json({ type: "success", data: { result: "Game Questions Data Added Successfully" } });
      }
   });
}






exports.SaveTestQuestions = async (req, res) => {
   const data = req.body;
   let tests = data.questions.filter((question) => {
      if (question.activity === "test") {
         return question;
      } else {
         return false;
      }
   })
   var query = mysql.format("Select COUNT(questionID) AS counts from question where classID=? AND subjectID=? AND chapterID=? AND activity=?", [data.class, data.subject, data.chapter, "test"]);
   db.query(query, (err, result, fields) => {
      if (err) {
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      }
      if (result[0].counts > 0) {
         res.status(200).json({ type: "fail", data: { msg: "Data Already Exists" } });
         return;
      } else {
         tests.forEach(async (question) => {
            var query = mysql.format("INSERT INTO question (type, question, option1, option2, option3, option4, answer, skill,classID,subjectID,chapterID,activity,videoURL) VALUES (?,?,?,?, ?,?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill, data.class, data.subject, data.chapter, question.activity, "noURL"]);
            db.query(query, (err, result, fields) => {
               if (err) {
                  res.status(500).json({ type: "failure", data: { message: err } });
                  return;
               }
            })
         });
         res.status(200).json({ type: "success", data: { result: "Test Questions Data Added Successfully" } });
      }
   });
}