module.exports = (req, res, next) => {
  const { email } = req.body;

  const errors = {};

  if (!email || typeof email !== "string") {
    errors.email = "Email is required and must be a string!";
  }

  if (Object.keys(errors).length) {
    return res.status(422).json({ message: "Ivalid inputs!", errors });
  }

  next();
};
