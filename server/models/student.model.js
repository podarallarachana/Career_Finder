const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name : {
        type: String
    },
    studentId : {
        type: String
    },
    points : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
});

module.exports = User = mongoose.model("student", StudentSchema);