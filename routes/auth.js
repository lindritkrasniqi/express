require("../database");
const router = require("express").Router();
const User = require("../models/user");

router.get("/login", async (req, res) => {
  res.json({ data: await User.find({}) });
});

router.get("/logout", (req, res) => {
  res.json({ message: "Logout" });
});

router.get("/register", (req, res) => {
  res.json({ message: "Register" });
});

router.get("/forgot", (req, res) => {
  res.json({ message: "Forgot" });
});

router.get("/reset", (req, res) => {
  res.json({ message: "Reset" });
});

module.exports = router;
