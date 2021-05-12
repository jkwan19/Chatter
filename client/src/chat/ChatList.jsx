import {
  useState,
  useEffect
} from "react";

import {
  List,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

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

export default function ChatList ({ friendsData, handleChat, socket }) {

  const classes = useStyles();

  const [friendsList, setFriendsList] = useState([]);
  const [ onlineUsers, setOnlineUsers ] = useState([]);


  useEffect(() => {

    socket.on('update', (users) => {
      setOnlineUsers(users)
    });

    setFriendsList(friendsData.map((friend) => {

      const {
        _id,
        username,
        numUnread,
        lastFrom,
        lastMessage
      } = friend;

      let notifications = 0;

      if (numUnread && (lastFrom === _id)) {
        notifications = numUnread;
      }

      return (
        <User
        key={_id}
        _id={_id}
        name={username}
        message={lastMessage || ''}
        numUnread={notifications}
        isOnline={onlineUsers[_id] ? true : false}
        isTyping={false}
        handleChat={handleChat}
        />
        )

    }));


  }, [friendsData, handleChat, onlineUsers, socket])

  return (
    <List
      className={classes.list}
      >
      {friendsList}
    </List>
  )
}