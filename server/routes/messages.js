const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const verify = require('../verification/verify-token');

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

let jwtUser = null;

//TOKEN VERIFICATION MIDDLEWARE
router.use(function(req, res, next) {
  jwtUser = jwt.verify(verify(req), keys.secretOrKey, function(err, decodedToken) {
    if(err) {
      res.status(400).send(err);
    }
    else {
     jwtUser = decodedToken;
     next();
    }
  });
});

//GET CONVERSATION
router.get('/conversations', (req, res) => {
  let from = mongoose.Types.ObjectId(jwtUser.id);
  Conversation.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipients',
        foreignField: '_id',
        as: 'recipientObj',
      },
    },
  ])
  .match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } })
  .project({
    'recipientObj.password': 0,
    'recipientObj.__v': 0,
    'recipientObj.date': 0,
  })
  .exec((err, conversations) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(conversations);
    }
  });
});

router.get('/conversations/query', (req, res) => {
  let user1 = mongoose.Types.ObjectId(jwtUser.id);
  let user2 = mongoose.Types.ObjectId(req.query.userId);
  Message.aggregate([
  {
    $lookup: {
        from: 'users',
        localField: 'to',
        foreignField: '_id',
        as: 'toObj',
    },
  },
  {
    $lookup: {
        from: 'users',
        localField: 'from',
        foreignField: '_id',
        as: 'fromObj',
    },
  },
  ])
  .match({
    $or: [
      { $and: [{ to: user1 }, { from: user2 }] },
      { $and: [{ to: user2 }, { from: user1 }] },
    ],
  })
  .project({
      'toObj.password': 0,
      'toObj.__v': 0,
      'toObj.date': 0,
      'fromObj.password': 0,
      'fromObj.__v': 0,
      'fromObj.date': 0,
  })
  .exec((err, messages) => {
      if (err) {
          console.log(err);
          res.status(400).send(err);
      } else {
          res.send(messages);
      }
  });
});

// ADD MESSAGE TO CONVERSATION
router.post('/', (req, res) => {
  let from = mongoose.Types.ObjectId(jwtUser.id);
  let to = mongoose.Types.ObjectId(req.body.to);
  Conversation.findOneAndUpdate(
    {
      recipients: {
        $all: [
          { $elemMatch: { $eq: from } },
          { $elemMatch: { $eq: to } },
          ],
      },
    },
    {
      recipients: [jwtUser.id, req.body.to],
      lastMessage: req.body.body,
      date: Date.now(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
    function(err, conversation) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        let message = new Message({
          conversation: conversation._id,
          to: req.body.to,
          from: jwtUser.id,
          body: req.body.body,
        });

        message.save(err => {
          if (err) {
            console.log(err);
            res.status(400).send(err)
          } else {
            res.end(
                JSON.stringify({
                    message: 'Success',
                    conversationId: conversation._id,
                })
            );
          }
        });
      }
    }
  );
});

module.exports = router;