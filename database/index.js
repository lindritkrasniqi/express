const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongodb");

module.exports = mongoose;
