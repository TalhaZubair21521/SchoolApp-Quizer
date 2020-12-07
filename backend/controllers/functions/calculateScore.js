exports.GetOverallResult = async (answers) => {
    let totalScore = 0;
    let totalQuestions = answers.length;
    let correctAnswers = 0;
    answers.forEach(async (element) => {
        if (element.answer === "NoAnswerGiven") {
        } else if (element.answer === element.original) {
            totalScore = totalScore + 6;
            correctAnswers = correctAnswers + 1;
        }
    });
    return { description: "Overall Result", score: totalScore, totalQuestions: totalQuestions, correctAnswers: correctAnswers };
}

exports.GetSubjects = async (answers) => {
    let subjects = [];
    answers.forEach(async (element) => {
        if (!subjects.includes(element.name)) {
            subjects.push(element.name);
        }
    });
    return subjects;
}

exports.GetSubjectWiseResult = async (answers) => {
    const subjects = await this.GetSubjects(answers);
    let subjectsMap = new Map();
    subjects.forEach(async (element) => {
        subjectsMap.set(element, 0);
    });
    answers.forEach(async (element) => {
        if (element.answer === element.original) {
            subjectsMap.set(element.name, (subjectsMap.get(element.name) + 1));
        }
    });
    let subjectWise = {};
    subjectsMap.forEach(async (value, key) => {
        subjectWise[key] = value;
    })
    return subjectWise;
}

exports.GetSkills = async (answers) => {
    let skills = [];
    answers.forEach(async (element) => {
        if (!skills.includes(element.skill)) {
            skills.push(element.skill);
        }
    });
    return skills;
}

exports.GetSkillWiseResult = async (answers) => {
    const skills = await this.GetSkills(answers);
    let skillsMap = new Map();
    skills.forEach(async (element) => {
        skillsMap.set(element, 0);
    });
    answers.forEach(async (element) => {
        if (element.answer === element.original) {
            skillsMap.set(element.skill, (skillsMap.get(element.skill) + 1));
        }
    });
    let skillWise = {};
    skillsMap.forEach(async (value, key) => {
        skillWise[key] = value;
    })
    return skillWise;
}