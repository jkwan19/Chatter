const Users = require("./models/User");
const Message = require("./models/Message");

const io = require("socket.io")();

const socketApi = {
  io: io,
  users: {},
  room: null,
  to: ''
};

let { users } = socketApi;


const addOnlineUsers = (socketID, userID) => {
  User.findOneAndUpdate({ _id: userID }, { isOnline: true }, (err) => {
    if (err) console.error(err)
  })
  if (users[userID] === undefined) {
    users[userID] = [socketID];
    updateUsers();
    return;
  }
  if (!users[userID].includes(socketID)) {
    users[userID].push(socketID);
    updateUsers();
    return;
  }
}

const removeOnlineUser = (socketID, userID) => {
  User.findOneAndUpdate({ _id: userID }, { isOnline: false }, (err) => {
    if (err) console.error(err)
  })
  if (users[userID] === undefined) return;
  if (users[userID].length === 1) {
    delete users[userID];
    updateUsers();
    return;
  }
  const index = users[userID].indexOf(socketID);
  index >= 0 && users[userID].splice(index, 1);
}

const updateUsers = () => {
  io.emit('update', users);
}

io.on('connection', (socket) => {

  const {
    username,
    userId
  } = socket.handshake.auth;

  socket.on('login', (data) => {
    if (data.userId) {
      addOnlineUsers(socket.id, data.userId);
      io.emit('online', data)
    }
  });

  socket.on('typing', (data)=>{
    if(data.typing === true) {
      io.emit('display', data)
    } else {
      io.emit('display', "")
    }
  })

  socket.on('enter_chatroom', (channel) => {
    const room = channel.conversationId;
    const members = channel.members;

    socket.join(room);
    socketApi.room = room;
  })

  socket.on('message', ({from, to, body}) => {
    console.log(users[from], 'convo')
    io.to(users[to]).to(users[from]).emit('message_sent', {
      from,
      to,
      body
    });
  })

  socket.on('notifications', (data)=> {
    io.emit('notification_read', data)
  })

  socket.on('update_logout', (data) => {
    const userId = data.userId;
    removeOnlineUser(socket.id, userId);
    io.emit("logout", data)
  });

  socket.on('disconnect', () => {
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



module.exports = socketApi;