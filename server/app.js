const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/users");
const messages = require("./routes/messages");

// DB Config
const db = require("./config/keys").mongoURI;3

const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// Routes
app.use("/api/users", users);
app.use("/api/messages", messages);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

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

