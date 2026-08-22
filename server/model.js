const mongoose = require("mongoose");

const carbonSchema = new mongoose.Schema({
  travel: Number,
  electricity: Number,
  food: String,
  total: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Carbon", carbonSchema);