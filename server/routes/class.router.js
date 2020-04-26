/*
routed from express.js
 */
const express = require("express");
const router = express.Router();
const classRoom = require("../controllers/class.controller");


//adds new class
router.post("/",classRoom.addclass);

//deletes class
router.delete("/",classRoom.deleteClass);

//gets all classes
router.get("/classes", classRoom.getClasses);

//gets specific class
router.get("/", classRoom.getClass);

//add student to class
router.post("/student", classRoom.addStudent);

//removes student from class
router.put("/student", classRoom.removeStudent);

//add teacher to class
router.get("/student/points", classRoom.getPoints);

//adds quiz points for students
router.put("/student/points", classRoom.addPoints);

module.exports = router;