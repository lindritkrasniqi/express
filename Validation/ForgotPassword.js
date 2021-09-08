module.exports = (req, res, next) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(422).json({
      message: "Email is required and must be a string!",
      key: "email",
    });
  }

  next();
};
