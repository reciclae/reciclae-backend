const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const uploadAvatar = require("../../middleware/uploadImage");
const userController = require("../../controllers/userController");

router.put("/user/img/:userID", checkToken, uploadAvatar.single('image'), userController.updateAvatar);
router.put("/user/:userID", checkToken, userController.updateUser);
router.delete("user/:userID", checkToken, userController.deleteUser);

module.exports = router;
