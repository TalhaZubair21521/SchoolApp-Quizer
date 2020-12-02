const db = require("../database/connect");
const mysql = require("mysql");

exports.GetQuestions = async (req, res) => {
    try {
        const activity = req.body.data.activity;
        const classID = req.body.data.class;
        const subjectID = req.body.data.subject;
        const chapterID = req.body.data.chapter;
        const userID = req.body.data.user;
        if (activity === "video") {
            var query = mysql.format("Select * from videoquestions where classID=? AND subjectID=? AND chapterID=?", [classID, subjectID, chapterID]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                } else {
                    if (result.length > 0) {
                        var query = mysql.format("Select * from videoquestions join videoanswers on videoquestions.questionID=videoanswers.videoquestionID where videoquestions.classID=? AND videoquestions.subjectID=? AND videoquestions.chapterID=? AND videoanswers.userID=?", [classID, subjectID, chapterID, userID]);
                        db.query(query, (err, result, fields) => {
                            if (err) {
                                res.status(500).json({ type: "failure", data: { message: err } });
                                return;
                            } else {
                                if (result.length > 0) {
                                    res.status(200).json({ type: "fail", data: "You have already Completed This Activity" })
                                } else {
                                    var query = mysql.format("Select * from videoquestions where classID=? AND subjectID=? AND chapterID=?;", [classID, subjectID, chapterID]);
                                    db.query(query, (err, result, fields) => {
                                        if (err) {
                                            res.status(500).json({ type: "failure", data: { message: err } });
                                            return;
                                        } else {
                                            res.status(200).json({ type: "success", data: { message: "Questions", questions: result } })
                                        }
                                    })
                                }
                            }
                        });
                    } else {
                        res.status(200).json({ type: "fail", data: "Admin has Not Added Questions For this Chapter" })
                    }
                }
            });
        } else if (activity === "revision") {

        } else if (activity === "game") {

        } else if (activity === "testpaper") {

        }



    } catch (error) {
        res.status(500).json({ type: "failure", data: { message: error } });
    }
}

exports.SaveAnswers = async (req, res) => {
    try {
        const userID = req.body.userID;
        const answers = req.body.data;
        let anss = answers.map((ans) => {
            if (typeof ans.answer === 'undefined' || ans.answer === "") {
                return { questionID: ans.questionID, answer: "NoAnswerGiven" }
            } else {
                return ans;
            }
        });
        anss.forEach(async (question) => {
            var query = mysql.format("INSERT INTO useranswer (userID,questionID,answer) VALUES (?,?,?)", [userID, question.questionID, question.answer]);
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