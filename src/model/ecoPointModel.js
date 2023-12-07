const mongoose = require("mongoose");

const ecoPointSchema = new mongoose.Schema({
  pointName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const EcoPointModel = mongoose.model("ecoPoint", userSchema);

module.exports = EcoPointModel;
