const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'conversations',
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  body: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    default: '',
  },
  isSeen: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Message = mongoose.model("message", MessageSchema);