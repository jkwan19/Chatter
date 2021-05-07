import {
  useState,
  useEffect,
  useContext,
  useRef
} from "react";

import {
  Grid,
  List,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from  "../context/AuthContext";
import authConversation from "../services/conversation.service";

import Compose from "../chat/Compose";
import Message from "../message/Message";
import Typing from "../message/Typing";

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
    minHeight: '70vh',
    maxHeight: '75vh',
    paddingBottom: theme.spacing(1),
    overflowY: 'scroll'
  },
}));

export default function Messenger ({
  user,
  recipient,
  friendsData,
  conversations,
  getMessages,
  getConversations,
  socket
  }) {

  const { username, userId } = useContext(AuthContext)

  const classes = useStyles();

  const [ newMessage, setNewMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);
  const [ recipientData, setRecipientData ] = useState({});
  const [ conversationList, setConversationList ] = useState([]);
  const [ recipientId, setRecipientId ] = useState();
  const [ isTyping, setIsTyping ] = useState('');
  const [ typingBox, setTypingBox ] = useState('');

  let chatBottom = useRef(null);


  useEffect(() => {
    socket.on("message_received", (data) => {
      if (data.to === userId) {
        getMessages(data.from);
      }
    });
  }, []);

  useEffect(() => {
    setRecipientId(recipient._id)
  }, [recipient])


  useEffect(() => {
    socket.on('display', (data)=>{
      if(data.typing === true && (socket.auth.username !== username)) {
        setIsTyping(true)
      } else {
        setIsTyping(false)
      }
    });

    if (!newMessage) {
      socket.emit("typing", {
        username,
        typing: false
      })
    };
  }, [newMessage, username])

  useEffect(() => {
    const data = friendsData.find(friendData => friendData._id === recipientId);
    let userMessages = conversations.filter(({conversation}) => {
      if (recipientData) {
        return conversation === recipientData.conversationId;
      } else {
        return [];
      }
    });
    setRecipientData(data);
    setMessages(userMessages)
  }, [recipientId, conversations, friendsData, recipientData])

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
    if (isTyping) {
      setTypingBox(
        <Typing
          recipient={recipient}
          isTyping={isTyping}
        />
      )
    } else {
      setTypingBox('')
    }
  }, [isTyping, messages, recipient])


  const handleSend = () => {
    if (newMessage) {
      const messageBody = {
        message: newMessage
      };
      authConversation.sendMessage(userId, recipientId, messageBody)
        .then(() => {
          getMessages(recipientId)
        })
        setNewMessage('');
        setIsTyping('');
    }
  }

  const handleMessage = (e) => {
    socket.emit("typing", {
      username,
      typing: true
    });
    setIsTyping(e.target.value)
    setNewMessage(e.target.value);
  }

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  if (!recipient) {
    return (
      <Grid
        item xs={12}
        className={classes.messenger}
        ></Grid>
    )
  };

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
          {typingBox}
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