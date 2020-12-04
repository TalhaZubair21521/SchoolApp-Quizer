const db = require("../database/connect");
const mysql = require("mysql");

exports.SaveVideoQuestions = async (req, res) => {
   try {
      let data = JSON.parse(req.body.data);
      let videos = data.questions.filter((question) => {
         if (question.activity === "video") {
            return question;
         } else {
            return false;
         }
      });
      var query = mysql.format("Select COUNT(questionID) AS counts from videoquestions where classID=? AND subjectID=? AND chapterID=?", [data.class, data.subject, data.chapter]);
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
               var query = mysql.format("INSERT INTO videoquestions (type, question, option1, option2, option3, option4, answer, skill,classID,subjectID,chapterID,videoURL) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill, data.class, data.subject, data.chapter, req.body.videoSource]);
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
   } catch (error) {
      console.error(error);
   }
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
   var query = mysql.format("Select COUNT(questionID) AS counts from revisionquestions where classID=? AND subjectID=? AND chapterID=?", [data.class, data.subject, data.chapter]);
   db.query(query, (err, result, fields) => {
      if (err) {
         console.log(err);
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      }
      if (result[0].counts > 0) {
         res.status(200).json({ type: "fail", data: { msg: "Data Already Exists" } });
         return;
      } else {
         revisions.forEach(async (question) => {
            var query = mysql.format("INSERT INTO revisionquestions (type, question, option1, option2, option3, option4, answer, skill,classID,subjectID,chapterID) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill, data.class, data.subject, data.chapter]);
            db.query(query, (err, result, fields) => {
               if (err) {
                  console.log(err);
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
   var query = mysql.format("Select COUNT(questionID) AS counts from gamequestions where classID=? AND subjectID=? AND chapterID=?", [data.class, data.subject, data.chapter]);
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
            var query = mysql.format("INSERT INTO gamequestions (type, question, option1, option2, option3, option4, answer, skill,classID,subjectID,chapterID) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill, data.class, data.subject, data.chapter]);
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
   var query = mysql.format("Select COUNT(questionID) AS counts from testpaperquestions where classID=? AND subjectID=? AND chapterID=?", [data.class, data.subject, data.chapter]);
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
            var query = mysql.format("INSERT INTO testpaperquestions (type, question, option1, option2, option3, option4, answer, skill,classID,subjectID,chapterID) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [question.type, question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.skill, data.class, data.subject, data.chapter]);
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



exports.GetClasses = async (req, res) => {
   var query = mysql.format("Select * from classes;", []);
   db.query(query, (err, result, fields) => {
      if (err) {
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      } else {
         res.status(200).json({ type: "success", result: result });
      }
   });
}

exports.GetSubjects = async (req, res) => {
   const classID = req.query.classId;
   var query = mysql.format("Select * from classes join classsubjects on classes.classId=classsubjects.classId join subjects on classsubjects.subjectId=subjects.subjectId where classes.classId=?", [classID]);
   db.query(query, (err, result, fields) => {
      if (err) {
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      } else {
         res.status(200).json({ type: "success", result: result });
      }
   });
}

exports.GetChapters = async (req, res) => {
   const classID = req.query.classId;
   const subjectID = req.query.subjectId;
   var query = mysql.format("select * from classes join classsubjects on classes.classId=classsubjects.classId join subjects on classsubjects.subjectId=subjects.subjectId join subjectschapter on subjectschapter.subjectId=subjects.subjectId join chapters on subjectschapter.chapterId=chapters.chapterId where classes.classId=? AND subjects.subjectId=?", [classID, subjectID]);
   db.query(query, (err, result, fields) => {
      if (err) {
         console.log(err);
         res.status(500).json({ type: "failure", data: { message: err } });
         return;
      } else {
         res.status(200).json({ type: "success", result: result });
      }
   });
}