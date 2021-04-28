const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

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
  const { _id, username, date } = user;
  res.cookie("token", token, { httpOnly: true });

  res.status(statusCode).json({
    status : "success",
    _id,
    username,
    date
  });
};

const createUser = (newUser, salt, res, err) => {
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) throw err;
    newUser.password = hash;
    newUser
      .save()
      .then(user => sendToken(user, 201, res))
      .catch(err => console.log(err));
  });
};

const findUser = (user, password, userPassword, res, errors) => {
  bcrypt.compare(password, userPassword).then(isMatch => {
    if (isMatch) {
      sendToken(user, 200, res);
    } else {
      errors.message = "Invalid credentials";
      return res
        .status(400)
        .json(errors);
    }
  });
}

module.exports = {
  createUser,
  findUser
}