const express = require('express');
const Student = require('../models/Student.model');

const router = express.Router();


// Students Routes:
// GET : all students
router.get("/", (req, res) => {
    Student.find()
      .then((students) => res.status(200).json(students))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error , while retreiving the students. " })
      );
  });
  // GET : student by id
  router.get("/:studentId", (req, res) => {
    Student.findById(req.params.studentId)
      .then((student) =>res.status(200).json(student))
      .catch((err) =>
        res.status(404).json({ message: "Error , in retriving a student" + err.message })
      );
  });



  // GET /cohort/:cohortId
  router.get('/cohort/:cohortId' , (req, res) => {
      Student.find({cohort: req.params.cohortId})
      .then((students) => res.status(200).json(students))
      .catch(err => res.status(500).json({message:`Error while retreiving students..` , type:err.message}));

  });
  // POST
  router.post('/' , async (req,res) => {
    try{
      const student = await Student.create(req.body);
      res.json(student);
    }
    catch(err) {
      res.status(500).json({message: err.message});
    }
  });
  // PUT
  router.put('/:studentId' , async (req,res) => {
    try{
      const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId , req.body);
      res.status(200).json(updatedStudent);
    }
    catch(err) {
      res.status(500).json({message: err.message});
    }
  });
  // DELETE
  router.delete('/:studentId' , async (req,res) => {
    try{
      await Student.findByIdAndDelete(req.params.studentId , req.body);
      res.json({message: "successfully deleted on student from the database.."});
    }
    catch(err) {
      res.status(500).json({message: err.message});
    }
  });

  module.exports = router;
  