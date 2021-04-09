import {
  useState,
  useEffect,
  useRef
} from "react";

import {
  Grid,
  List,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Compose from "../chat/Compose";
import Message from "../message/Message";

const useStyles = makeStyles(theme => ({
  messenger: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(0, 2),
    overflow: 'hidden',
  },
  messageList:{
    maxHeight: '75vh',
    paddingBottom: theme.spacing(1),
    overflowY: 'scroll'
  },
}));

const getMilitaryTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${hour}:${min}`;
}

export default function Messenger ({ recipient }) {

  const classes = useStyles();

  const [ newMessage, setNewMessage ] = useState('');
  const [ messages, setMessages ] = useState(recipient.conversation);

  let chatBottom = useRef(null);

  const handleSend = () => {
    const messageBody = {
      timeStamp: getMilitaryTime(),
      message: newMessage,
      isReceived: false,
      isSeen: false,
      isTyping: false,
      media: ""
    }
    setMessages([...messages, messageBody])
    setNewMessage('');
  }

  const handleMessage = (e) => {
    setNewMessage(e.target.value);
  }

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);


  const listConversation = messages.map((content, key) => {
    const {
      timeStamp,
      message,
      media,
      isReceived,
      isSeen,
      isTyping
    } = content;
    return (
      <Message
        key={key}
        timeStamp={timeStamp}
        message={message}
        media={media}
        isReceived={isReceived}
        isSeen={isSeen}
        isTyping={isTyping}
        recipient={recipient}
      />
    )
  })
  return (
    <Grid
      item xs={12}
      className={classes.messenger}
      >
      <List>
        <Grid
          container
          className={classes.messageList}>
          {listConversation}
          <div ref={chatBottom} />
        </Grid>
        <Compose
          newMessage={newMessage}
          handleSend={handleSend}
          handleMessage={handleMessage}
        />
      </List>
    </Grid>
  )
}