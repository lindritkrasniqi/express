module.exports = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(422).json({ message: "Username field is required." });
  }

  if (!password || typeof password !== "string") {
    return res.status(422).json({ message: "Password field is required." });
  }

  next();
};
