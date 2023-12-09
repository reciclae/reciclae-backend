const mongoose = require("mongoose");

const ecoPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  metal: {
    type: Boolean,
  },
  plastic: {
    type: Boolean,
  },
  paper: {
    type: Boolean,
  },
  glass: {
    type: Boolean,
  },
  organic: {
    type: Boolean,
  },
  electronic: {
    type: Boolean,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },  
});

const EcoPointModel = mongoose.model("ecopoint", ecoPointSchema);

module.exports = EcoPointModel;
