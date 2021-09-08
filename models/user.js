const mongoose = require("../database");

const schema = new mongoose.Schema({
  name: { required: true, type: String },
  username: { required: true, type: String, unique: true },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String, select: false },
  email_verified_at: { required: false, type: Date, default: null },
  resetPassword: {
    token: { required: false, type: String },
    expires_at: { required: false, type: Date },
    select: false,
  },
  created_at: { required: true, type: Date, default: Date.now() },
  updated_at: { required: true, type: Date, default: Date.now() },
});

schema.pre("save", (next) => {
  this.updated_at = Date.now();

  next();
});

module.exports = mongoose.model("User", schema);
