module.exports = (req, res, next) => {
  const { name, username, email, password, password_confirmation } = req.body;

  const errors = {};

  if (!name || typeof name !== "string") {
    errors.name = "Name field is required and must be a string!";
  }

  if (!username || typeof username !== "string") {
    errors.username = "Username field is required and must be a string!";
  }

  if (!email || typeof email !== "string") {
    errors.email = "Email field is required and must be a string!";
  }

  if (!password || typeof password !== "string") {
    errors.password = "Password field is required and must be a string!";
  }

  if (password !== password_confirmation) {
    errors.password = "Password doesn't match!";
  }

  if (Object.keys(errors).length) {
    return res.status(422).json({ message: "Ivalid inputs!", errors });
  }

  next();
};
