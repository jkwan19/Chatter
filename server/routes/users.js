const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");
const {
  createUser,
  findUser
} = require("../controllers/users");

router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.message = "Invalid credentials";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        createUser(newUser, salt, res, err)
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
      errors.message = "Invalid credentials";
      return res.status(400).json(errors);
    }
    findUser(user, password, user.password, res, errors);
  });
});


router.post("/logout", (req, res) => {
  res.clearCookie('token');
  res.send( {success: true} );
})

router.get("/is_authenticated", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
      decoded.status = true;
      res.status(200).send(decoded)
    });
  } else {
    res.status(400).send(null)
  }
})

module.exports = router;