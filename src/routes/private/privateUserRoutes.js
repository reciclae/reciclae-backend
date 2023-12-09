const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const uploadAvatar = require("../../middleware/uploadImage");
const userController = require("../../controller/userController");

router.put("/user/:userID", checkToken, userController.updateUser);
router.put("/user/avatar/:userID", checkToken, uploadAvatar.single('image'), userController.updateAvatar);
router.delete("/user/:userID", checkToken, userController.deleteUser);

module.exports = router;
