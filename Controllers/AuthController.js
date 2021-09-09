require("../database");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ranStr = require("randomstring");
const moment = require("moment");
const { sendMail } = require("../plugins/nodeMailer");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(422).json({
        message: "Ivalid inputs",
        errors: {
          username: "These credentials doesn't match our records!",
        },
      });
    }

    const credentials = await bcrypt.compare(password, user.password);

    if (!credentials) {
      return res.status(422).json({
        message: "Ivalid inputs",
        errors: {
          username: "These credentials doesn't match our records!",
        },
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token, { maxAge: 2 }).json({ token });
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
    if (error.code === 11000) {
      return res.status(400).json({
        message: error.keyPattern.username
          ? "Username has already been taken!"
          : "Email has already been taken!",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

const forgot = async (req, res) => {
  try {
    // get email and find user
    const { email } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username: email }] });

    if (!user) {
      return res.status(422).json({
        message: "Ivalid inputs",
        errors: {
          email: "No user with the given email/username!",
        },
      });
    }

    // set a token and expires date

    user.resetPassword = {
      token: ranStr.generate(),
      expires_at: moment().add(10, "minutes").format(),
    };

    await user.save();

    // send an email with reset link

    await sendMail(email, {
      subject: "Reset password link", // Subject line
      html: `<a href='http://localhost:8000/accounts/reset?email=${email}&token=${user.resetPassword.token}'>Reset password link</a>`, // html body
    });

    res.json({ message: "Reset password link has been sent!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const reset = async (req, res) => {
  try {
    const { email, token, password: plainText } = req.body;

    //Verify if user with current email exists

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({
        message: "Ivalid inputs",
        errors: { email: "User not found!" },
      });
    }

    //Verify token if it is valid

    if (
      !token ||
      !user.resetPassword ||
      token !== user.resetPassword.token ||
      Date.now() > user.resetPassword.expires_at
    ) {
      return res.status(403).json({ message: "Invalid token! Please try again." });
    }

    //enctypt new password

    password = await bcrypt.hash(
      plainText,
      parseInt(process.env.BCRYPT_LENGTH)
    );

    //update password

    user.password = password;
    user.resetPassword = {};

    await user.save();

    res.json({ message: "Your password has been reset!" });
  } catch (e) {
    res.status(500).json({ message: e.massage });
  }
};

const me = (req, res) => {
  res.json({ data: req.user });
};

module.exports = { login, logout, register, forgot, reset, me };
