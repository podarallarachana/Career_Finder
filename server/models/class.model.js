const mongoose = require("mongoose");
const quiz = require("../models/quiz.model");
const student = require("../models/student.model");

const ClassSchema = new mongoose.Schema({
    name : {
        type: String
    },
    points : {
        type: Number
    },
    ofTeacherId : [String],
    ofStudentId : [],
    ofQuizzes : []

});

module.exports = User = mongoose.model("class", ClassSchema);