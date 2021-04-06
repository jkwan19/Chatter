import {
  List
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import User from "../profile/User";

const useStyles = makeStyles(theme => ({
  list: {
    marginRight: theme.spacing(2)
  }
}));

export default function ChatList (props) {

  const classes = useStyles();

  const { handleChat } = props;

  return (
    <List
      container
      className={classes.list}
      >
      <User
        name='santiago'
        message=""
        numUnread={0}
        isOnline={true}
        isRead={true}
        isTyping={true}
        handleChat={handleChat}
        />
      <User
        name='chiumbo'
        message="Sure! What time?"
        numUnread={1}
        isOnline={true}
        isRead={false}
        handleChat={handleChat}
        />
      <User
        name='hualing'
        message="😅 😅 😅"
        numUnread={12}
        isOnline={false}
        isRead={false}
        handleChat={handleChat}
        />
      <User
        name='ashanti'
        message="Sent photo"
        isOnline={false}
        isRead={true}
        handleChat={handleChat}
        />
      <User
        name='julia'
        message="Do you have any plans?"
        isOnline={false}
        isRead={true}
        handleChat={handleChat}
       />
      <User
        name='cheng'
        message="Message"
        isOnline={false}
        isRead={true}
        handleChat={handleChat}
        />
    </List>
  )
}