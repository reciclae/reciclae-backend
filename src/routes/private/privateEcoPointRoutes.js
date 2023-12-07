const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const ecoPointController = require("../../controller/ecoPointController");

router.get("/ecopoint", checkToken, ecoPointController.getPoints);
router.get("/ecopoint/:ecoPointID", checkToken, ecoPointController.getPoint);
router.get("/userecopoint/:userID", checkToken, ecoPointController.getUserPoints);
router.post("/ecopoint", checkToken, ecoPointController.createPoint);
router.put("/ecopoint/:ecoPointID", checkToken, ecoPointController.updatePoint);
router.delete("/ecopoint/:ecoPointID", checkToken, ecoPointController.deletePoint);

module.exports = router;
