const mongoose = require("mongoose");
const quiz = require("../models/quiz.model");

const ClassSchema = new mongoose.Schema({
    name : {
        type: String
    },
    ofTeacherId : [String],
    ofStudentId : [String],
    ofQuizzes : []
});

module.exports = User = mongoose.model("class", ClassSchema);