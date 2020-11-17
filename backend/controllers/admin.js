const db = require("../database/connect");
const mysql = require("mysql");

exports.SaveActivityQuestions = async (req, res) => {
   const data = {
      class: 1,
      subject: 1,
      chapter: 1,
      questions: [
         { activity: "video", type: "mcqs", question: "What is Kharif Crop?", option1: "Wheat", option2: "Rice", option3: "Flour", option4: "Melon", answer: "Wheat", skill: "Reading" },
         { activity: "video", type: "mcqs", question: "In the video which machinary is used for farming?", option1: "Car", option2: "Tractor", option3: "Jeep", option4: "Bulldozer", answer: "Tractor", skill: "Observation" },
         { activity: "video", type: "mcqs", question: "How do you sow?", option1: "Mars", option2: "Flour", option3: "Earth", option4: "Jubiter", answer: "Earth", skill: "Listening" },
         { activity: "video", type: "mcqs", question: "What is Rabi?", option1: "Lazani", option2: "Pike", option3: "Jugus", option4: "Shallow", answer: "Jugus", skill: "Writing" },
         { activity: "video", type: "mcqs", question: "What ingredient is used while sowing wseds?", option1: "Crops", option2: "Masters", option3: "Fertilizer", option4: "Germs", answer: "Fertilizers", skill: "Learning" },

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