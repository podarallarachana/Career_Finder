const Class = require("../models/class.model");
const User = require("../models/user.model");

/*
very basic creates a class with 16 quizzes and one teacher
 */
exports.addclass = async (req,res) => {
    try {
        let classRoom = new Class({
            name : req.body.name,
            ofTeacherId: [req.body.teacherId],
            ofQuizzes: [
                {name: "q1"}, {name : "q2" }, {name: "q3"}, {name: "q4"}, {name: "q5"},
                {name: "q6"}, {name: "q7"}, {name: "q8"}, {name: "q9"}, {name: "q10"},
                {name: "q11"}, {name: "q12"}, {name: "q13"}, {name: "q14"}, {name: "q15"},
                {name: "q16"}]
        });
        await classRoom.save();
        res.status(200).send("Saved");
    } catch (err) {
        res.status(404).send("Error");
    }
};

//gets all classes, need to make it filter by teacher requesting
exports.getClasses = async  (req,res) => {
    try {
        res.status(200).send(await Class.find());
    } catch (err) {
        res.status(400).send("Error");
    }
}

//deletes specific class
exports.deleteClass = async (req,res) => {
    try{
        await Class.findOneAndDelete({
            name : req.body.name
        });
        console.log(req);
        res.status(200).send("Deleted");
    } catch (err) {
        res.status(400).send("Error");
    }
};

//gets specific class
exports.getClass = async (req,res) => {
    try {
        console.log(req);
        res.status(200).send(await Class.findOne({name : req.body.name}));
    } catch (err) {
        res.status(400).send("Error");
    }
};

//work in progress
exports.addStudent = async  (req,res) => {
    try {
        await Class.findOne({_id : req.body.id}).then( async function(result) {
            result.ofStudentId.push(req.body.studentId);
            await result.save();
            res.status(200).send("Added");
        });
    } catch (err) {
        res.status(400).send("Error");
    }
};

exports.getGrades = (req,res) => {

};

