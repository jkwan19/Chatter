import {
  useState,
  useEffect,
  useContext
} from "react";

import {
  List,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from  "../context/AuthContext";

import User from "../profile/User";

const useStyles = makeStyles(theme => ({
  list: {
    marginRight: theme.spacing(2),
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    position: 'relative',
    [theme.breakpoints.down("sm")]: {
      marginRight: 0
    }
  }
}));

export default function ChatList ({
  friendsData,
  handleChat,
  socket,
  typingUsers,
  onlineUsers,
  notificationList
}) {

  const classes = useStyles();

  const { userId } = useContext(AuthContext)

  const [ friendsList, setFriendsList ] = useState([]);

  useEffect(() => {
    setFriendsList(friendsData.map((friend) => {

      let {
        _id,
        username,
        numUnread,
        lastMessage,
        lastFrom
      } = friend;

      if (lastFrom === userId) {
        numUnread = 0;
      }

      return (
        <User
        key={_id}
        _id={_id}
        name={username}
        message={lastMessage || ''}
        numUnread={notificationList[_id] || numUnread || 0}
        isOnline={onlineUsers[_id] ? true : false}
        isTyping={typingUsers[_id] ? true : false}
        handleChat={handleChat}
        />
        )

    }));


  }, [friendsData, handleChat, onlineUsers, typingUsers, notificationList, userId])

  return (
    <List
      className={classes.list}
      >
      {friendsList}
    </List>
  )
}