const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    name : {
        type: String
    },
    points : {
        type: Map,
        of : Number
    }
});

module.exports = User = mongoose.model("quiz", QuizSchema);