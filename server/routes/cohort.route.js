const express = require('express');
const Cohort = require('../models/Cohort.model');

const router = express.Router();


// Cohorts Routes:
// GET : all cohorts
router.get("/", (req, res) => {
    Cohort.find()
      .then((cohorts) => res.status(200).json(cohorts))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error , while retreiving the cohort. " , type: err.message })
      );
  });
  // GET : cohort by id
  router.get("/:cohortId", (req, res) => {
    Cohort.findById(req.params.cohortId)
      .then((cohort) =>res.status(200).json(cohort))
      .catch((err) =>
        res.status(404).json({ message: "Error , in retriving a cohort" + err.message })
      );
  });
  // POST
  router.post('/' , async (req,res) => {
    try{
      const cohort = await Cohort.create(req.body);
      res.json(cohort);
    }
    catch(err) {
      res.status(500).json({message: err.message});
    }
  });
  // PUT
  router.put('/:cohortId' , async (req,res) => {
    try{
      const updatedCohort = await Cohort.findByIdAndUpdate(req.params.cohortId , req.body);
      res.status(200).json(updatedCohort);
    }
    catch(err) {
      res.status(500).json({message: err.message});
    }
  });
  // DELETE
  router.delete('/:cohortId' , async (req,res) => {
    try{
      await Cohort.findByIdAndDelete(req.params.cohortId , req.body);
      res.json({message: "successfully deleted cohort from the database.."});
    }
    catch(err) {
      res.status(500).json({message: err.message});
    }
  });

  module.exports = router;
  