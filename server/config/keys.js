require("dotenv").config();

module.exports = {
  mongoURI: 'mongodb://127.0.0.1:27017/hatchways',
  //add to env
  secretOrKey: process.env.SECRET_OR_KEY,
};