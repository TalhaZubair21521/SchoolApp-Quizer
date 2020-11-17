const db = require("../database/connect");
const mysql = require("mysql");

exports.GetQuestions = async (req, res) => {
    try {
        const activity = req.body.data.activity;
        const classID = req.body.data.class;
        const subjectID = req.body.data.subject;
        const chapterID = req.body.data.chapter;
        var query = mysql.format("SELECT * from question join activityquestion on question.questionID=activityquestion.questionID join belongto on belongto.belongToID=activityquestion.belongToID where activityquestion.activity=? && belongto.classID=? && belongto.subjectID=? && belongto.chapterID=?;", [activity, classID, subjectID, chapterID]);
        db.query(query, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ type: "failure", data: { message: err } });
                return;
            }
            res.status(200).json({ type: "success", data: { message: "Questions", questions: result } })
        })
    } catch (error) {
        res.status(500).json({ type: "failure", data: { message: error } });
    }
}

exports.SaveAnswers = async (req, res) => {
    try {
        const userID = req.body.userID;
        const belongToID = req.body.belongToID;

        const answers = req.body.data;
        // answers = [
        //     { questionID: 1, answer: "answerForQuestion1" },
        //     { questionID: 2, answer: "answerForQuestion2" },
        //     { questionID: 3, answer: "answerForQuestion3" },
        //     { questionID: 4, answer: "answerForQuestion4" },
        //     { questionID: 5, answer: "answerForQuestion5" },
        // ];

        answers.forEach(async (question) => {
            var query = mysql.format("INSERT INTO useranswer (userID,questionID,belongToID,answer) VALUES (?,?,?,?)", [userID, question.questionID, belongToID, question.answer]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                }
            });
        });
        res.status(200).json({ type: "success", data: { message: "Answer Saved Successfully" } })
    } catch (error) {
        res.status(500).json({ type: "failure", data: { message: error } });
    }
}