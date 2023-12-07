const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const userController = require("../../controller/userController");

router.post("/api/register", checkToken, userController.signin);
router.post("/api/login", checkToken, userController.login);

module.exports = router;
