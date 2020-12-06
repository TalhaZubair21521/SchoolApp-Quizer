const db = require("../database/connect");
const mysql = require("mysql");
const Helper = require("./functions/calculateScore");
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
                        var query = mysql.format("Select * from videoquestions where classID=? AND subjectID=? AND chapterID=?;", [classID, subjectID, chapterID]);
                        db.query(query, (err, result, fields) => {
                            if (err) {
                                res.status(500).json({ type: "failure", data: { message: err } });
                                return;
                            } else {
                                res.status(200).json({ type: "success", data: { message: "Questions", questions: result } })
                            }
                        });
                    } else {
                        res.status(200).json({ type: "fail", data: "Admin has Not Added Questions For this Chapter" })
                    }
                }
            });
        } else if (activity === "revision") {
            var query = mysql.format("Select * from revisionquestions where classID=? AND subjectID=? AND chapterID=?", [classID, subjectID, chapterID]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                } else {
                    if (result.length > 0) {
                        var query = mysql.format("Select * from revisionquestions where classID=? AND subjectID=? AND chapterID=?;", [classID, subjectID, chapterID]);
                        db.query(query, (err, result, fields) => {
                            if (err) {
                                res.status(500).json({ type: "failure", data: { message: err } });
                                return;
                            } else {
                                res.status(200).json({ type: "success", data: { message: "Questions", questions: result } })
                            }
                        })
                    } else {
                        res.status(200).json({ type: "fail", data: "Admin has Not Added Questions For this Chapter" })
                    }
                }
            });

        } else if (activity === "game") {
            var query = mysql.format("Select * from gamequestions where classID=? AND subjectID=? AND chapterID=?", [classID, subjectID, chapterID]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                } else {
                    if (result.length > 0) {
                        var query = mysql.format("Select * from gamequestions where classID=? AND subjectID=? AND chapterID=?;", [classID, subjectID, chapterID]);
                        db.query(query, (err, result, fields) => {
                            if (err) {
                                res.status(500).json({ type: "failure", data: { message: err } });
                                return;
                            } else {
                                res.status(200).json({ type: "success", data: { message: "Questions", questions: result } })
                            }
                        })
                    } else {
                        res.status(200).json({ type: "fail", data: "Admin has Not Added Questions For this Chapter" })
                    }
                }
            });

        } else if (activity === "test") {
            var query = mysql.format("Select * from testpaperquestions where classID=? AND subjectID=? AND chapterID=?", [classID, subjectID, chapterID]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                } else {
                    if (result.length > 0) {
                        var query = mysql.format("Select * from testpaperquestions where classID=? AND subjectID=? AND chapterID=?;", [classID, subjectID, chapterID]);
                        db.query(query, (err, result, fields) => {
                            if (err) {
                                res.status(500).json({ type: "failure", data: { message: err } });
                                return;
                            } else {
                                res.status(200).json({ type: "success", data: { message: "Questions", questions: result } })
                            }
                        })
                    } else {
                        res.status(200).json({ type: "fail", data: "Admin has Not Added Questions For this Chapter" })
                    }
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ type: "failure", data: { message: error } });
    }
}

exports.SaveAnswers = async (req, res) => {
    try {
        const userID = req.body.userID;
        const classID = req.body.classID;
        const subjectID = req.body.subjectID;
        const chapterID = req.body.chapterID;

        const answers = req.body.data;
        const activity = req.body.activity;
        let anss = answers.map((ans) => {
            if (typeof ans.answer === 'undefined' || ans.answer === "") {
                return { questionID: ans.questionID, answer: "NoAnswerGiven" }
            } else {
                return ans;
            }
        });
        if (activity === "video") {
            var query = mysql.format("Select * from videoquestions join videoanswers on videoquestions.questionID=videoanswers.videoquestionID where videoquestions.classID=? AND videoquestions.subjectID=? AND videoquestions.chapterID=? AND videoanswers.userID=?", [classID, subjectID, chapterID, userID]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                } else {
                    if (result.length > 0) {
                        res.status(200).json({ type: "fail", data: "Result could not be Saved. You have Already Submitted the Answers" })
                    } else {
                        anss.forEach(async (question) => {
                            var query = mysql.format("INSERT INTO videoanswers (userID,videoquestionID,answer) VALUES (?,?,?)", [userID, question.questionID, question.answer]);
                            db.query(query, (err, result, fields) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ type: "failure", data: { message: err } });
                                    return;
                                }
                            });
                        });
                        res.status(200).json({ type: "success", data: { message: "Answer Saved Successfully" } });
                    }
                }
            });
        } else if (activity === "revision") {
            var query = mysql.format("Select * from revisionquestions join revisionanswers on revisionquestions.questionID=revisionanswers.reivisionquestionID where revisionquestions.classID=? AND revisionquestions.subjectID=? AND revisionquestions.chapterID=? AND revisionanswers.userID=?", [classID, subjectID, chapterID, userID]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                } else {
                    if (result.length > 0) {
                        res.status(200).json({ type: "fail", data: "Result could not be Saved. You have Already Submitted the Answers" })
                    } else {
                        anss.forEach(async (question) => {
                            var query = mysql.format("INSERT INTO revisionanswers (userID,reivisionquestionID,answer) VALUES (?,?,?)", [userID, question.questionID, question.answer]);
                            db.query(query, (err, result, fields) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ type: "failure", data: { message: err } });
                                    return;
                                }
                            });
                        });
                        res.status(200).json({ type: "success", data: { message: "Answer Saved Successfully" } });
                    }
                }
            });
        } else if (activity === "game") {
            var query = mysql.format("Select * from gamequestions join gameanswers on gamequestions.questionID=gameanswers.gamequestionID where gamequestions.classID=? AND gamequestions.subjectID=? AND gamequestions.chapterID=? AND gameanswers.userID=?", [classID, subjectID, chapterID, userID]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                } else {
                    if (result.length > 0) {
                        res.status(200).json({ type: "fail", data: "Result could not be Saved. You have Already Submitted the Answers" })
                    } else {
                        anss.forEach(async (question) => {
                            var query = mysql.format("INSERT INTO gameanswers (userID,gamequestionID,answer) VALUES (?,?,?)", [userID, question.questionID, question.answer]);
                            db.query(query, (err, result, fields) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ type: "failure", data: { message: err } });
                                    return;
                                }
                            });
                        });
                        res.status(200).json({ type: "success", data: { message: "Answer Saved Successfully" } });
                    }
                }
            });
        } else if (activity === "test") {
            var query = mysql.format("Select * from testpaperquestions join testpaperanswers on testpaperquestions.questionID=testpaperanswers.testpaperquestionID where testpaperquestions.classID=? AND testpaperquestions.subjectID=? AND testpaperquestions.chapterID=? AND testpaperanswers.userID=?", [classID, subjectID, chapterID, userID]);
            db.query(query, (err, result, fields) => {
                if (err) {
                    res.status(500).json({ type: "failure", data: { message: err } });
                    return;
                } else {
                    if (result.length > 0) {
                        res.status(200).json({ type: "fail", data: "Result could not be Saved. You have Already Submitted the Answers" })
                    } else {
                        anss.forEach(async (question) => {
                            var query = mysql.format("INSERT INTO testpaperanswers (userID,testpaperquestionID,answer) VALUES (?,?,?)", [userID, question.questionID, question.answer]);
                            db.query(query, (err, result, fields) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ type: "failure", data: { message: err } });
                                    return;
                                }
                            });
                        });
                        res.status(200).json({ type: "success", data: { message: "Answer Saved Successfully" } });
                    }
                }
            });
        }
    } catch (error) {
        res.status(500).json({ type: "failure", data: { message: error } });
    }
}

exports.GetScore = async (req, res) => {
    try {
        const userID = req.query.userID;
        const classID = req.query.classID;
        const subjectID = req.query.subjectID;
        const chapterID = req.query.chapterID;

        let userAnswers = [];

        var query = mysql.format("select q.answer as original,q.questionID as ID, a.answer as answer,'video' as activity, a.userID as userID from videoquestions as q join videoanswers as a on q.questionID=a.videoquestionID where a.userID=? AND q.classID=? AND q.subjectID=? AND q.chapterID=?;", [userID, classID, subjectID, chapterID]);
        db.query(query, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ type: "failure", data: { message: err } });
                return;
            } else {
                userAnswers = [...userAnswers, ...result];
                var query = mysql.format("select q.answer as original,q.questionID as ID, a.answer as answer,'revision' as activity, a.userID as userID from revisionquestions as q join revisionanswers as a on q.questionID=a.reivisionquestionID where a.userID=? AND q.classID=? AND q.subjectID=? AND q.chapterID=?;", [userID, classID, subjectID, chapterID]);
                db.query(query, (err, result, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ type: "failure", data: { message: err } });
                        return;
                    } else {
                        userAnswers = [...userAnswers, ...result];
                        var query = mysql.format("select q.answer as original,q.questionID as ID, a.answer as answer,'test' as activity, a.userID as userID from testpaperquestions as q join testpaperanswers as a on q.questionID=a.testpaperquestionID where a.userID=? AND q.classID=? AND q.subjectID=? AND q.chapterID=?;", [userID, classID, subjectID, chapterID]);
                        db.query(query, async (err, result, fields) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ type: "failure", data: { message: err } });
                                return;
                            } else {
                                userAnswers = [...userAnswers, ...result];
                                const score = await Helper.GetScore(userAnswers);
                                res.status(200).json({ type: "success", result: { dataOF: { classID: classID, subjectID: subjectID, chapterID: chapterID, userID: userID, score: score } } });
                            }
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: "failure", result: error })
    }
}

