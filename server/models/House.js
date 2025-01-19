const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  title: String,
  address: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  locality: String,
});

module.exports = mongoose.model("House", houseSchema);
