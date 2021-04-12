import {
  useEffect,
  useState,
} from "react";
import {
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ErrorMessage from "../snackbar/ErrorMessage";
import Status from "../profile/Status";
import ChatHeader from "../chat/ChatHeader";
import MessageHeader from "../chat/MessageHeader";
import Name from "../profile/Name";
import SearchBar from "../search/SearchBar";
import ChatList from "../chat/ChatList";
import LogoutMenu from "../menu/LogoutMenu";
import Messenger from "../chat/Messenger";
import friendsList from "./friends.json";

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
  const [ recipient, setRecipient ] = useState({})

  useEffect(() => {
    setFriends(friendsList);
    setRecipient(friendsList[0]);
  }, []);

  const handleChat = (e) => {
    const id = e.target.offsetParent.id || e.target.id;
    const user = friends[id - 1];
    setRecipient(user)
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
            <Status name='thomas' status='online'/>
            <Name name="thomas" />
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
            friends={friends}
            filter={filter}
            handleChat={handleChat}
            />
      </Grid>
      {/* Column two for messages with user*/}
      <Grid
        item xs={8} sm={9} md={9}
        className={classes.messageContainer}
        >
        <MessageHeader
          name={recipient.name}
          status={recipient.isOnline}
          />
        <Messenger
          recipient={recipient}
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
