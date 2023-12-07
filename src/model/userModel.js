const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  ecoPoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ecoPoint' }],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
