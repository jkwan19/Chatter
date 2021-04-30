import {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import authConversation from "../services/conversation.service";
import authUser from "../services/user.service";
import { AuthContext } from  "../context/AuthContext";

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

  const [ open, setOpen ] = useState(false);
  const [ friends, setFriends ] = useState([]);
  const [ filter, setFilter ] = useState('');
  const [ recipient, setRecipient ] = useState([]);
  const [ conversations,  setConversations] = useState([]);
  const [ friendsData, setFriendsData ] = useState([]);

  const { loggedIn, setLoggedIn, user, setUser } = useContext(AuthContext);

  useEffect(() => {
    authConversation.getConversations().then(res => {
      setConversations(res)
    })
  }, [])

  useEffect(() => {
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
  }, [filter])

  useEffect(() => {
    if (friends && conversations ) {

      let dataList = [];
      friends.map((friend) => {
        let conversationData = conversations.filter(conversation => {
          return conversation.membersObj[0]._id === friend._id
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
  }, [friends])


  const handleChat = (e) => {
    const userId = e.target.offsetParent.id;

    for (let i = 0; i < friendsData.length; i++) {
      let friend = friendsData[i];
      if (friend._id === userId) {
        setRecipient(friend)
      }

    }
    authConversation.getConversationMessages(userId)
      .then(res => setConversations(res))
      .catch(err => console.log(err))
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
            <Status name={user} status='online'/>
            <Name name={user} />
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
          status={true}
         />
        <Messenger
          recipient={recipient}
          friendsData={friendsData}
          conversations={conversations}
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
