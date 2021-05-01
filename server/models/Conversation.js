const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    ],
    lastMessage: {
      type: String,
    },
    numUnread: {
      type: Number,
      default: 0
    }
});

module.exports = Conversation = mongoose.model("conversations", ConversationSchema);