const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const ecoPointController = require("../../controller/ecoPointController");
const uploadAvatar = require("../../middleware/uploadImage");

router.get("/ecopoints", checkToken, ecoPointController.getPoints);
router.post("/ecopoint", checkToken, uploadAvatar.single('image'), ecoPointController.createPoint);
router.get("/userecopoint/:userID", checkToken, ecoPointController.getUserPoints);
router.put("/ecopoint/:ecoPointID", checkToken, uploadAvatar.single('image'), ecoPointController.updatePoint);
router.delete("/ecopoint/:ecoPointID", checkToken, ecoPointController.deletePoint);

module.exports = router;