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
  typingUsers,
  socket
  }) {

  const { userId } = useContext(AuthContext)

  const classes = useStyles();

  const [ newMessage, setNewMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);
  const [ recipientData, setRecipientData ] = useState({});
  const [ conversationList, setConversationList ] = useState([]);
  const [ recipientId, setRecipientId ] = useState();
  const [ isTyping, setIsTyping ] = useState(false);

  let chatBottom = useRef(null);

  useEffect(() => {
    setRecipientId(recipient._id)
  }, [recipient])


  useEffect(() => {
    if (recipientData) {
      authConversation.readMessage(recipientData.conversationId)
    }
  }, [recipientData])

  useEffect(() => {
    if (!newMessage) {
      socket.emit("typing", {
        from: userId,
        to: recipientId,
        typing: false
      })
    };
  }, [userId, socket, recipientId, newMessage])

  useEffect(() => {
<<<<<<< HEAD
    if (typingUsers[recipient._id]) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [typingUsers, isTyping, recipient])

  useEffect(() => {
=======
>>>>>>> master
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

  }, [messages, recipient])

  const handleSend = () => {
    if (newMessage) {
      const messageBody = {
        message: newMessage
      };
      authConversation.sendMessage(userId, recipientId, messageBody)
        .then(() => {
          getMessages(recipientId)
<<<<<<< HEAD
          socket.emit('notifications', {
            to: recipientId,
            from: userId
          })
=======
>>>>>>> master
        })
        setNewMessage('');
    }
  }

  const handleMessage = (e) => {
    setNewMessage(e.target.value);
    socket.emit("typing", {
      from: userId,
      to: recipient._id,
      typing: true,
      room: recipientData.conversationId
    });
  }

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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
          {isTyping && <Typing recipient={recipient} isTyping={isTyping}/>}
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