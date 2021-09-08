const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_LINK);

module.exports = mongoose;
