require("../database");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res
        .status(422)
        .json({ message: "These credentials doesn't match our records!" });
    }

    const credentials = await bcrypt.compare(password, user.password);

    if (credentials) {
      const token = await jwt.sign(
        { _id: user._id, name: user.name },
        process.env.JWT_SECRET
      );

      res.cookie("jwt", token, { maxAge: 2 }).json({ token });
    } else {
      res
        .status(422)
        .json({ message: "These credentials doesn't match our records!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json(1);
};

const register = async (req, res) => {
  try {
    const { name, username, email, password: plainText } = req.body;

    password = await bcrypt.hash(
      plainText,
      parseInt(process.env.BCRYPT_LENGTH)
    );

    await User.create({ name, username, email, password });

    res.status(201).json({ message: "Successfully registred!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgot = (req, res) => {};

const reset = (req, res) => {};

module.exports = { login, logout, register, forgot, reset };
