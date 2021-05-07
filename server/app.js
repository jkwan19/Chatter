const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const { join } = require("path");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');

const users = require("./routes/users");
const messages = require("./routes/messages");

// DB Config
const db = keys.mongoURI;

const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use("images", express.static(join(__dirname, "public")));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


app.use("/api/users", users);

//TOKEN VERIFICATION MIDDLEWARE
app.use((req, res, next) => {
  jwt.verify(req.cookies.token, keys.secretOrKey, (err, decodedToken) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      req.jwtUser = decodedToken;
      next();
    }
  });
});


app.use("/api/messages", messages);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});


mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


module.exports = app;

