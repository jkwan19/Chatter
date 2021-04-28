const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');


//GET CONVERSATION

router.get('/', (req, res) => {
  let from = mongoose.Types.ObjectId(req.jwtUser.id);

  User.aggregate()
    .match({ _id: { $not: { $eq: from } } })
    .project({
      password: 0,
      __v: 0,
      date: 0,
    })
    .exec((err, users) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(users);
      }
    });
})

router.get('/conversations', (req, res) => {
  let from = mongoose.Types.ObjectId(req.jwtUser.id);

  Conversation.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'members',
        foreignField: '_id',
        as: 'membersObj',
      },
    },
  ])
  .match({ members: { $all: [{ $elemMatch: { $eq: from } }] } })
  .project({
    "membersObj.password": 0,
    "membersObj.__v": 0,
    "membersObj.email": 0,
    "membersObj.date": 0
  })
  .exec((err, conversations) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(conversations)
    }
  });
});

router.get('/conversations/query', (req, res) => {
  let user1 = mongoose.Types.ObjectId(req.jwtUser.id);
  let user2 = mongoose.Types.ObjectId(req.query.userId);

  Message.aggregate([
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
      { $and: [{ from: user2 }] },
      { $and: [{ from: user1 }] },
    ],
  })
  .project({
    "fromObj.password": 0,
    "fromObj.__v": 0,
    "fromObj.email": 0,
    "fromObj.date": 0
  })
  .exec((err, messages) => {
      if (err) {
          res.status(400).send(err);
      } else {
          res.send(messages);
      }
  });
});

// ADD MESSAGE TO CONVERSATION
router.post('/', (req, res) => {
  let from = mongoose.Types.ObjectId(req.jwtUser.id);
  let to = mongoose.Types.ObjectId(req.body.to);

  Conversation.findOneAndUpdate(
    {
      members: {
        $all: [
          { $elemMatch: { $eq: from } },
          { $elemMatch: { $eq: to } },
          ],
      },
    },
    {
      members: [from, to],
      lastMessage: req.body.body,
      date: Date.now(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
    function(err, conversation) {
      if (err) {
        res.status(400).send(err);
      } else {
        let message = new Message({
          conversation: conversation._id,
          from: from,
          body: req.body.body,
        });
        message.save(err => {
          if (err) {
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