const mongoose = require("mongoose");
const quiz = require("../models/quiz.model");
const quiz = require("../models/student.model");

const ClassSchema = new mongoose.Schema({
    name : {
        type: String
    },
    ofTeacherId : [String],
    ofStudent : [],
    ofQuizzes : []
});

module.exports = User = mongoose.model("class", ClassSchema);