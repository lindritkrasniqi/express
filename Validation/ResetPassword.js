module.exports = (req, res, next) => {
  const { email, token, password, password_confirmation } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(422).json({
      message: "Email is required and must be a string!",
      key: "email",
    });
  }

  if (!token || typeof token !== "string") {
    return res.status(422).json({
      message: "Token is required and must be a string!",
      key: "token",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(422).json({
      message: "Password is required and must be a string!",
      key: "password",
    });
  }

  if (password !== password_confirmation) {
    return res.status(422).json({
      message: "The password doesn't match!",
      key: "password",
    });
  }

  next();
};
