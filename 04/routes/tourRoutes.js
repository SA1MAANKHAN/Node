const fs = require("fs");

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require("../controllers/tourController");

const express = require("express");

const router = express.Router();

router.param("id", checkID);

router.route(`/`).get(getAllTours).post(checkBody, createTour);
router.route(`/:id`).get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
