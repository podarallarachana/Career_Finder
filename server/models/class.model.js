const mongoose = require("mongoose");
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

});

module.exports = User = mongoose.model("class", ClassSchema);