module.exports = (req, res, next) => {
  const { email, password } = req.body;

  const errors = {};

  if (!email || typeof email !== "string") {
    errors.email = "The email field is required.";
  }

  if (!password || typeof password !== "string") {
    errors.password = "The password field is required.";
  }

  if (Object.keys(errors).length) {
    return res.status(422).json({ message: "Ivalid inputs!", errors });
  }

  next();
};
