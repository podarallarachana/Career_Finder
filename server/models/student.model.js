const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name : {
        type: String
    },
    studentId : {
        type: String
    },
    grades : {
        type: Map,
        of : Number
    },
    progress : {
        type: Map,
        of : Number
    }
});

module.exports = User = mongoose.model("quiz", StudentSchema);