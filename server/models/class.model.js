const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    name : {
        type: String
    },
    ofTeacherId : [String],
    ofStudentId : [],

});

module.exports = User = mongoose.model("class", ClassSchema);