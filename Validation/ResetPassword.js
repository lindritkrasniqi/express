module.exports = (req, res, next) => {
  const { email, token, password, password_confirmation } = req.body;

  const errors = {};

  if (!email || typeof email !== "string") {
    errors.email = "Email is required and must be a string!";
  }

  if (!token || typeof token !== "string") {
    errors.token = "Token is required and must be a string!";
  }

  if (!password || typeof password !== "string") {
    errors.password = "Password is required and must be a string!";
  }

  if (password && password.length < 6) {
    errors.password = "Password must contain at least 6 characters!";
  }

  if (password !== password_confirmation) {
    errors.password = "The password doesn't match!";
  }

  if (Object.keys(errors).length) {
    return res.status(422).json({ message: "Ivalid inputs!", errors });
  }

  next();
};
