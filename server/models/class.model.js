const mongoose = require("mongoose");
<<<<<<< HEAD
=======
const quiz = require("../models/quiz.model");
const student = require("../models/student.model");
>>>>>>> dd13840d97756d505e2f4437107d883192d7009b

const ClassSchema = new mongoose.Schema({
    name : {
        type: String
    },
    ofTeacherId : [String],
    ofStudentId : [],
    ofQuizzes : []

});

module.exports = User = mongoose.model("class", ClassSchema);