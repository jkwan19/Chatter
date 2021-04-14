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

export default function ChatList ({ filter, friends, handleChat }) {

  const classes = useStyles();

  const filterFunc = ({ name }) => {
    return name.toLowerCase().indexOf(filter) > -1;
  }

  const listFriends = friends.filter(filterFunc).map((friend) => {
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