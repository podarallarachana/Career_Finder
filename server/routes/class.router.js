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

module.exports = router;