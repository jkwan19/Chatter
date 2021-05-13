import {
  useContext,
  useEffect,
  useState,
} from "react";

import { useHistory } from "react-router-dom";

import {
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import authConversation from "../services/conversation.service";
import authUser from "../services/user.service";
import { AuthContext } from  "../context/AuthContext";
import socket from "../socket";

import ErrorMessage from "../snackbar/ErrorMessage";
import Status from "../profile/Status";
import ChatHeader from "../chat/ChatHeader";
import MessageHeader from "../chat/MessageHeader";
import Name from "../profile/Name";
import SearchBar from "../search/SearchBar";
import ChatList from "../chat/ChatList";
import LogoutMenu from "../menu/LogoutMenu";
import Messenger from "../chat/Messenger";

const useStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      display: 'none'
    },
  },
  chatSection: {
    marginTop: '6px',
    padding: theme.spacing(1)
  },
  label: {
    padding: theme.spacing(1)
  },
  messageContainer: {
  },
  profileHeader: {
    alignItems: 'center',
    padding: theme.spacing(1, 0, 1, 1)
  }
}));


export default function Dashboard() {

  const classes = useStyles();
  const history = useHistory();

  const [ open, setOpen ] = useState(false);
  const [ friends, setFriends ] = useState([]);
  const [ filter, setFilter ] = useState('');
  const [ recipient, setRecipient ] = useState([]);
  const [ conversations,  setConversations] = useState([]);
  const [ messages, setMessages ] = useState([]);
  const [ friendsData, setFriendsData ] = useState([]);
  const [ typingUsers, setTypingUsers ] = useState({});
  const [ notificationList, setNotificationList ] = useState({});

  const { loggedIn, username, userId } = useContext(AuthContext)

  /* GET CONVERSATIONS && MESSAGES */

  const getMessages = (userId) => {
    authConversation.getConversationMessages(userId)
      .then(res => setMessages(res))
      .catch(err => console.log(err))
  }

  const getConversations = () => {
    authConversation.getConversations().then(res => {
      setConversations(res)
    });
  }

  /*LOGIN & LOGOUT */

  useEffect(() => {
    socket.auth = {
      userId,
      username
    };

    socket.emit("login", {
      userId
    })
    socket.connect();

  }, [userId, username])

  useEffect(() => {
    if(!loggedIn) {
      history.push("/login")
    }
  }, [loggedIn, history])

  useEffect(() => {
    socket.on('logout', (data) => {
      authUser.getUsers().then(res => {
        setFriends(res);
      })
    })
  }, [])

  useEffect(() => {
    socket.on("message_sent", (data) => {
      if ((data.to === userId) && (data.from === recipient._id) ) {
        const message = {
          _id: Math.random(0, 1000).toString(),
          from: data.from,
          date: Date.now(),
          body: data.body,
          conversation: recipient.conversationId,
          isSeen: false
        }
        setMessages([...messages, message])
      }
    });
  }, [messages, userId, recipient]);

  /* LIST AND FILTER CONVERSATIONS */

  useEffect(() => {
    getConversations();
  }, [messages])

  useEffect(() => {
    socket.on('online', (data) => {
      if(!filter) {
        authUser.getUsers().then(res => {
          setFriends(res)
        })
      } else {
        authConversation.findConversation(filter)
        .then(res => {
          setFriends(res)
        })
      }
    })
  }, [filter])

  useEffect(() => {
    if (friends && conversations ) {

      let dataList = [];
      friends.map((friend) => {
        let conversationData = conversations.filter(conversation => {
          return conversation.members.includes(friend._id)
        })

        if (conversationData[0]) {
          conversationData[0] = {
              conversationId: conversationData[0]._id,
              ...conversationData[0]
            };
        }
        let data = {...conversationData[0], ...friend}

        dataList = [...dataList, data];
        return dataList;
      })

      setFriendsData(dataList)
    }
  }, [friends, conversations])

  useEffect(() => {
    socket.on('update_last_message', ({
      to,
      from,
      body
    }) => {
      let targetIndex;
      friendsData.forEach((friendData, index) => {
        if (friendData.members) {
          if ((friendData.members.indexOf(to) > -1) && (friendData.members.indexOf(from) > -1)) {
            targetIndex = index;
          }
        }
      })
      const targetData = friendsData[targetIndex];
      if (targetData) {
        const friendsDataCopy = friendsData;
        targetData.lastMessage = body;
        friendsDataCopy[targetIndex] = targetData;
        setFriendsData(friendsDataCopy);
      }
    })
  }, [friendsData])

  useEffect(() => {
    socket.on('display', (data)=> {
      let typingUsersObj = {};
      if (data.typing) {
        friendsData.forEach((friendData) => {
          if (friendData._id === data.from) {
            typingUsersObj[friendData._id] = true;
          } else {
            typingUsersObj[friendData._id] = false;
          }
        })
      } else {
        friendsData.forEach((friendData) => {
          if (friendData._id === data.from) {
            typingUsersObj[friendData._id] = false;
          }
        })
      }
      setTypingUsers(typingUsersObj)
    });
  }, [friendsData])

  useEffect(() => {
    socket.on('add_notification', (data) => {
      let notificationListObj = {};
      friendsData.forEach((friendData) => {
        if ((friendData._id === data.from) && (recipient._id !== data.from)) {
          if (notificationList[data.from]) {
            notificationListObj[data.from] = notificationList[data.from] + 1;
          } else {
            notificationListObj[data.from] = 1;
          }
        }
      })
      setNotificationList(notificationListObj)
    });
  }, [notificationList, friendsData, recipient._id])

  const handleChat = (e) => {
    const userId = e.target.offsetParent.id;

    for (let i = 0; i < friendsData.length; i++) {
      let friend = friendsData[i];
      if (friend._id === userId) {
        socket.emit('enter_chatroom', friend);
        const room = friend.conversationId;
        setRecipient(friend);
        authConversation.readMessage(room)

        let newNotificationList = notificationList;
        delete newNotificationList[friend._id];

        setNotificationList(newNotificationList);
        getMessages(userId);
      }
    }
  }


  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleErrorMessage = () => {
    setOpen(true);
  }

  const findConversation = (e) => {
    const name = e.target.value;
    setFilter(name)
  }

  return (
    <Grid container
      className={classes.root}
      >
      {/* Column one for users and profile*/}
      <Grid item container xs={4} sm={3} md={3}
        className={classes.chatSection}
         >
          <Grid
            container
            className={classes.profileHeader}
            >
            <Status name={username} status='online'/>
            <Name name={username} />
            <LogoutMenu handleLogoutError={handleErrorMessage}/>
          </Grid>
          <Grid
            item
            className={classes.label}
            >
            <ChatHeader />
          </Grid>
          <SearchBar findConversation={findConversation}/>
          <ChatList
            handleChat={handleChat}
            friendsData={friendsData}
            typingUsers={typingUsers}
            notificationList={notificationList}
            socket={socket}
            />
      </Grid>
      {/* Column two for messages with user*/}
      <Grid
        item xs={8} sm={9} md={9}
        className={classes.messageContainer}
        >
        <MessageHeader
          name={recipient.username}
          status={recipient.isOnline}
         />
        <Messenger
          user={username}
          recipient={recipient}
          friendsData={friendsData}
          conversations={messages}
          getMessages={getMessages}
          getConversations={getConversations}
          typingUsers={typingUsers}
          socket={socket}
          />
      </Grid>
      <ErrorMessage
        open={open}
        message='Logout failed'
        handleClose={handleClose}
      />
    </Grid>
  );
}
