const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(200).send({ msg: "You are already signed up, please log in." });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).send({ msg: "Error hashing password" });
      }

      const newUser = new User({ name, email, phone, password: hash });
      await newUser.save();

      res.status(201).send({ msg: "Sign up successful" });
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).send({ msg: "You are not signed up. Please sign up first." });
    }

    bcrypt.compare(password, isUser.password, (err, result) => {
      if (err) {
        return res.status(500).send({ msg: "Error comparing passwords" });
      }

      if (result) {
        const token = jwt.sign(
          { userID: isUser._id, phone: isUser.phone },
          process.env.tokenSecretSign,
          { expiresIn: "24h" }
        );

        res.status(200).send({ msg: "Login successful", token, user: isUser });
      } else {
        res.status(401).send({ msg: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
