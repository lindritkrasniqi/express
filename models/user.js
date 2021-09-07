const mongoose = require("../database");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { required: true, type: String },
    username: { required: true, type: String, unique: true },
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    email_verified_at: { required: false, type: Date, default: null },
    created_at: { required: true, type: Date, default: Date.now() },
    updated_at: { required: true, type: Date, default: Date.now() },
  })
);
