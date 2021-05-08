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

  const { username, userId } = useContext(AuthContext)

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
    socket.on('logout', (data) => {
      authUser.getUsers().then(res => {
        setFriends(res);
      })
    })
  }, [])

  useEffect(() => {
    if(!username) {
      history.push("/login")
    }
  }, [username, history])

  useEffect(() => {
    getConversations();
  }, [messages])


  /* LIST AND FILTER CONVERSATIONS */

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


  const handleChat = (e) => {
    const userId = e.target.offsetParent.id;

    for (let i = 0; i < friendsData.length; i++) {
      let friend = friendsData[i];
      if (friend._id === userId) {
        const room = friend.conversationId;
        setRecipient(friend);
        socket.auth = {
          id: friend._id,
          username: username
        }
        authConversation.readMessage(room)
      }
    }
    getMessages(userId);
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
