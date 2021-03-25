require("dotenv").config();

module.exports = {
  mongoURI: 'mongodb://127.0.0.1:27017/hatchways',
  secretOrKey: process.env.SECRET_OR_KEY,
};