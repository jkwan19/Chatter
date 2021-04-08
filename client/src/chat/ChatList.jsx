import {
  List
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import User from "../profile/User";

const useStyles = makeStyles(theme => ({
  list: {
    marginRight: theme.spacing(2),
    height: '100%',
  }
}));

export default function ChatList ({ friends, handleChat }) {

  const classes = useStyles();

  const listFriends = friends.map((friend) => {
    const {
      id,
      name,
      message,
      numUnread,
      isOnline,
      isRead,
      isTyping
    } = friend;

    return (
      <User
        key={id}
        index={id}
        name={name}
        message={message}
        numUnread={numUnread}
        isOnline={isOnline}
        isRead={isRead}
        isTyping={isTyping}
        handleChat={handleChat}
      />
    )
  })

  return (
    <List
      className={classes.list}
      >
      {listFriends}
    </List>
  )
}