const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");

const invalidMessage = "Invalid credentials";

const signJwt = (id) => {
  return jwt.sign(
    { id },
    keys.secretOrKey,
    {
      expiresIn: "604800" //expires in 7 day in seconds,
    });
};

const sendToken = (user, statusCode, res) => {
  const token = signJwt(user._id);

  res.cookie("token", token, { httpOnly: true });

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const hash = (newUser, salt, res, err) => {
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) throw err;
    newUser.password = hash;
    newUser
      .save()
      .then(user => sendToken(user, 201, res))
      .catch(err => console.log(err));
  });
};

const compare = (user, password, userPassword, res, errors) => {
  bcrypt.compare(password, userPassword).then(isMatch => {
    if (isMatch) {
      sendToken(user, 200, res);
    } else {
      errors.password = 3;
      return res
        .status(400)
        .json(errors);
    }
  });
}

router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ error: errors });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        hash(newUser, salt, res, err)
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = invalidMessage;
      return res.status(404).json(errors);
    }
    compare(user, password, user.password, res, errors);
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie('token');
  res.send( {success: true} );
})

module.exports = router;