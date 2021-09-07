module.exports = (req, res, next) => {
  const { name, username, email, password, password_confirmation } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(422).json({
      message: "Invalid input data",
      error: "Name field is required and must be a string!",
    });
  }

  if (!username || typeof username !== "string") {
    return res.status(422).json({
      message: "Invalid input data",
      error: "Username field is required and must be a string!",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(422).json({
      message: "Invalid input data",
      error: "Email field is required and must be a string!",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(422).json({
      message: "Invalid input data",
      error: "Password field is required and must be a string!",
    });
  }

  if (password !== password_confirmation) {
    return res.status(422).json({
      message: "Invalid input data",
      error: "Your password doesn't match!",
    });
  }

  next();
};
