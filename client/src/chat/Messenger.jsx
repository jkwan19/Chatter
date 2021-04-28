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
import conversation from "./conversation.json";

const useStyles = makeStyles(theme => ({
  messenger: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0, 1),
    overflow: 'hidden',
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      margin: 0
    }
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
  const [ messages, setMessages ] = useState(conversation);
  const [ conversationList, setConversationList ] = useState([]);

  let chatBottom = useRef(null);

  useEffect(() => {
    setConversationList(messages.map((content, key) => {
      return (
        <Message
          key={key}
          content={content}
          recipient={recipient}
        />
      )
    }))
  }, [conversationList])

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

  return (
    <Grid
      item xs={12}
      className={classes.messenger}
      >
      <List>
        <Grid
          container
          className={classes.messageList}>
          {conversationList}
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