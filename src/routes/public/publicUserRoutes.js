const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const userController = require("../../controller/userController");

router.post("/signin", userController.signin);
router.post("/login", userController.login);
router.get("/users/561273456sdf1vKOHr0oi3uj4098kasdjf", userController.findall);

module.exports = router;
