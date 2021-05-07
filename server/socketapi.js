const Users = require("./models/User");
const Message = require("./models/Message");

const io = require("socket.io")();

const socketApi = {
  io: io,
  users: []
};

let { users } = socketApi;


const addOnlineUsers = (socketID, userID) => {
  User.findOneAndUpdate({ _id: userID }, { isOnline: true }, (err) => {
    if (err) console.log(err)
  })
  if (users[socketID] === undefined) {
    users[socketID] = [userID];
    console.log(users, 'users')
    console.log(`${userID} is online!`)
    return;
  }
  if (!users[socketID].includes(userID)) {
    users[socketID].push(userID);
    return;
  }
}

const removeOnlineUser = (socketID, userID) => {
  User.findOneAndUpdate({ _id: userID }, { isOnline: false }, (err) => {
    if (err) console.log(err)
  })
  if (users[socketID] === undefined) return;
  if (users[socketID].length === 1) {
    delete users[socketID];
    return;
  }
  const index = users[socketID].indexOf(userID);
  index >= 0 && users[socketID].splice(index, 1);
}

io.on('connection', function(socket) {

  const {
    username,
    userId
  } = socket.handshake.auth;

  console.log(`${username} has connected`);

  socket.on('login', function(data){
    if (data.userId) {
      addOnlineUsers(socket.id, data.userId)
    }
  });

  socket.on('typing', (data)=>{
    if(data.typing === true) {
      io.emit('display', data)
    } else {
      io.emit('display', '')
    }
  })

  socket.on('message', ({from, to, body}) => {
    io.emit('message_received', {
      from,
      to,
      body
    });
  })
  socket.on('disconnect', function(){
    const userId = users[socket.id];
    removeOnlineUser(socket.id, userId)
  });

})

io.use((socket, next) => {
  const token = socket.handshake.headers.cookie.replace("token=", "");

  if (!token) {
    return next(new Error("invalid user"));
  }
  next();
});

socketApi.updateStatus = function (users) {
  io.emit('status', users)
}

socketApi.sendMessage = function (message, to) {
  io.to(to).emit('message', message);
};


module.exports = socketApi;