const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const requireAuth = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["Authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthenticated." });
  }

  next();
};

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["Authorization"];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id: decoded._id }).select("-password");
  } catch (error) {
    return res.status(401).json({ message: "Unauthenticated." });
  }

  next();
};

module.exports = { requireAuth, verifyToken };
