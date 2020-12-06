exports.GetScore = async (answers) => {
    let score = 0;
    answers.forEach(async (element) => {
        if (element.answer === "NoAnswerGiven") {
        } else if (element.answer === element.original) {
            score = score + 5;
        } else {
            score = score + 1;
        }
    });
    return score;
}