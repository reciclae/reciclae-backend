const express = require("express");
const router = express.Router();
const ecoPointController = require("../../controller/ecoPointController");

router.get("/graphicpoints", ecoPointController.getGraphicPoints);

module.exports = router;