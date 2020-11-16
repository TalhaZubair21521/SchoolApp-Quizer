const db = require("../database/connect");
const mysql = require("mysql");

exports.SaveActivityQuestions = async (req, res) => {
   const data = {
      class: 1,
      subject: 1,
      chapter: 1,
      questions: [
         { activity: "video", type: "mcqs", question: "What is your name 1?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "reading" },
         { activity: "video", type: "mcqs", question: "What is your name 2?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "B", skill: "observation" },
         { activity: "video", type: "mcqs", question: "What is your name 3?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "A", skill: "listening" },
         { activity: "video", type: "mcqs", question: "What is your name 4?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "C", skill: "writing" },
         { activity: "video", type: "mcqs", question: "What is your name 5?", option1: "A", option2: "B", option3: "C", option4: "D", answer: "D", skill: "learning" },

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

   //Inserting Belong To Details
   var query = mysql.format("INSERT INTO belongto (classID, subjectID, chapterID) VALUES (?,?,?)", [data.class, data.subject, data.chapter]);
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
               console.log(err);
               res.status(500).json({ type: "failure", data: { message: err } });
               return;
            }
            const questionID = result.insertId;
            //Inserting Activity Questions
            var query = mysql.format("INSERT INTO activityquestion (activity, questionID, belongToID) VALUES (?,?,?)", [activity, questionID, belongToID]);
            db.query(query, (err, result, fields) => {
               if (err) {
                  console.log(err);
                  res.status(500).json({ type: "failure", data: { message: err } });
                  return;
               }
            })
         })
      });
      //Sending Response
      res.status(200).json({ type: "success", data: { message: "Questions Inserted Successfully" } })
   });
}