module.exports = (req, res, next) => {
  const { username, password } = req.body;

  const errors = {};

  if (!username || typeof username !== "string") {
    errors.username = "The username field is required.";
  }

  if (!password || typeof password !== "string") {
    errors.password = "The password field is required.";
  }

  if (Object.keys(errors).length) {
    return res.status(422).json({ message: "Ivalid inputs!", errors });
  }

  next();
};
