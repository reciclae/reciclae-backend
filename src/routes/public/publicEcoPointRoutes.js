const express = require("express");
const router = express.Router();
const ecoPointController = require("../../controller/ecoPointController");

router.get("/graphicpoints", ecoPointController.getGraphicPoints);
router.get("/ecopoints/public", ecoPointController.getPoints);
router.get("/ecopoint/:ecoPointID",  ecoPointController.getPoint);

module.exports = router;