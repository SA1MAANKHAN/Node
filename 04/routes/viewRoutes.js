const express = require("express");
const viewsController = require("../controllers/viewsController");

const route = express.Router();

// website rendering

router.get("/", viewsController.getOverview);

router.get("/tour", viewsController.getTour);

module.exports = router;
